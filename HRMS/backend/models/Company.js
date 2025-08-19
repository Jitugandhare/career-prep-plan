const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  // Company Profile
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['main_office', 'branch'],
    default: 'main_office'
  },
  registrationNumber: {
    type: String,
    unique: true,
    sparse: true
  },
  gstNumber: {
    type: String,
    unique: true,
    sparse: true
  },
  
  // Location
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: {
      type: String,
      default: 'India'
    }
  },
  contactInfo: {
    phone: String,
    email: String,
    website: String
  },
  
  // Company Details
  industry: String,
  foundedYear: Number,
  employeeCount: Number,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: String,
  head: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const sectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  code: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  description: String,
  head: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
    required: true
  },
  description: String,
  lead: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const shiftCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['fixed', 'rotational', 'flexible'],
    required: true
  },
  description: String,
  workingHours: {
    start: String, // Format: "09:00"
    end: String,   // Format: "18:00"
    duration: Number // in hours
  },
  weeklyOffs: [{
    type: String,
    enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  }],
  gracePeriod: {
    type: Number, // in minutes
    default: 15
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const holidaySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    enum: ['national', 'company', 'optional'],
    default: 'national'
  },
  description: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const companyEventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: String,
  startDate: {
    type: Date,
    required: true
  },
  endDate: Date,
  type: {
    type: String,
    enum: ['meeting', 'training', 'celebration', 'other'],
    default: 'other'
  },
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  location: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes
companySchema.index({ name: 1 });
departmentSchema.index({ code: 1 });
sectionSchema.index({ code: 1, department: 1 });
shiftCategorySchema.index({ name: 1 });
holidaySchema.index({ date: 1 });
companyEventSchema.index({ startDate: 1 });

// Virtual for full address
companySchema.virtual('fullAddress').get(function() {
  if (!this.address) return '';
  const { street, city, state, pincode, country } = this.address;
  return [street, city, state, pincode, country].filter(Boolean).join(', ');
});

// Virtual for department count
companySchema.virtual('departmentCount').get(function() {
  return this.departments ? this.departments.length : 0;
});

// Export models
module.exports = {
  Company: mongoose.model('Company', companySchema),
  Department: mongoose.model('Department', departmentSchema),
  Section: mongoose.model('Section', sectionSchema),
  Team: mongoose.model('Team', teamSchema),
  ShiftCategory: mongoose.model('ShiftCategory', shiftCategorySchema),
  Holiday: mongoose.model('Holiday', holidaySchema),
  CompanyEvent: mongoose.model('CompanyEvent', companyEventSchema)
};
