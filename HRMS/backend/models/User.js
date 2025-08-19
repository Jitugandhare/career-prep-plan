const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  // Basic Info
  employeeId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  
  // Role and Access
  role: {
    type: String,
    enum: ['super_admin', 'admin', 'manager', 'employee'],
    default: 'employee'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Employee Details
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section'
  },
  designation: {
    type: String,
    required: true
  },
  dateOfJoining: {
    type: Date,
    required: true
  },
  employeeStatus: {
    type: String,
    enum: ['probation_new', 'probation_performance', 'regular', 'trainee', 'parttime', 'consultant', 'notice_period', 'intern', 'inactive', 'contract'],
    default: 'probation_new'
  },
  employeeCategory: {
    type: String,
    enum: ['general_1', 'general_2', 'support', 'housekeeping', 'general_flexi'],
    default: 'general_1'
  },
  
  // Personal Info
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  maritalStatus: {
    type: String,
    enum: ['single', 'married', 'divorced', 'widowed']
  },
  contactNumber: {
    type: String
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String,
    address: String
  },
  
  // Address
  currentAddress: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: String
  },
  permanentAddress: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: String
  },
  
  // Documents
  panCard: {
    type: String,
    unique: true,
    sparse: true
  },
  aadharCard: {
    type: String,
    unique: true,
    sparse: true
  },
  
  // Probation and Notice Period
  probationPeriod: {
    duration: Number, // in months
    startDate: Date,
    endDate: Date,
    isExtended: {
      type: Boolean,
      default: false
    },
    extensionHistory: [{
      previousEndDate: Date,
      newEndDate: Date,
      reason: String,
      approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      approvedDate: Date
    }]
  },
  noticePeriod: {
    duration: Number, // in days
    startDate: Date,
    endDate: Date
  },
  
  // Last Login
  lastLogin: {
    type: Date
  },
  
  // Password Reset
  passwordResetToken: String,
  passwordResetExpires: Date,
  
  // Email Verification
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: String,
  emailVerificationExpires: Date
}, {
  timestamps: true
});

// Indexes
userSchema.index({ employeeId: 1 });
userSchema.index({ email: 1 });
userSchema.index({ department: 1 });
userSchema.index({ employeeStatus: 1 });

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS) || 12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Instance method to generate JWT token
userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { 
      id: this._id, 
      employeeId: this.employeeId, 
      role: this.role,
      department: this.department 
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  );
};

// Instance method to get public profile
userSchema.methods.getPublicProfile = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.passwordResetToken;
  delete userObject.passwordResetExpires;
  delete userObject.emailVerificationToken;
  delete userObject.emailVerificationExpires;
  return userObject;
};

// Static method to generate employee ID
userSchema.statics.generateEmployeeId = async function(departmentCode, sectionCode, postCode) {
  const lastEmployee = await this.findOne({
    employeeId: new RegExp(`^PTL${departmentCode}${sectionCode}${postCode}`)
  }).sort({ employeeId: -1 });
  
  let sequenceNumber = 1;
  if (lastEmployee) {
    const lastSequence = parseInt(lastEmployee.employeeId.slice(-2));
    sequenceNumber = lastSequence + 1;
  }
  
  return `PTL${departmentCode}${sectionCode}${postCode}${sequenceNumber.toString().padStart(2, '0')}`;
};

// Virtual for full name
userSchema.virtual('fullNameFormatted').get(function() {
  return this.fullName;
});

// Virtual for age
userSchema.virtual('age').get(function() {
  if (!this.dateOfBirth) return null;
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

// Virtual for years of service
userSchema.virtual('yearsOfService').get(function() {
  if (!this.dateOfJoining) return null;
  const today = new Date();
  const joiningDate = new Date(this.dateOfJoining);
  let years = today.getFullYear() - joiningDate.getFullYear();
  const monthDiff = today.getMonth() - joiningDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < joiningDate.getDate())) {
    years--;
  }
  return years;
});

module.exports = mongoose.model('User', userSchema);
