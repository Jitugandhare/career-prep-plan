const mongoose = require('mongoose');

const leaveTypeSchema = new mongoose.Schema({
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
  numberOfLeaves: {
    type: Number,
    required: true
  },
  period: {
    type: String,
    enum: ['monthly', 'yearly', 'quarterly'],
    default: 'yearly'
  },
  employeeStatus: [{
    type: String,
    enum: ['probation_new', 'probation_performance', 'regular', 'trainee', 'parttime', 'consultant', 'notice_period', 'intern', 'inactive', 'contract']
  }],
  notificationPeriod: {
    type: Number, // in days
    default: 1
  },
  isEmergencyAllowed: {
    type: Boolean,
    default: false
  },
  isShortLeaveAllowed: {
    type: Boolean,
    default: false
  },
  shortLeavePercentage: {
    type: Number, // percentage of a day
    default: 25
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const leaveRequestSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  leaveType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LeaveType',
    required: true
  },
  
  // Leave details
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  numberOfDays: {
    type: Number,
    required: true
  },
  isHalfDay: {
    type: Boolean,
    default: false
  },
  halfDayType: {
    type: String,
    enum: ['first_half', 'second_half']
  },
  
  // Request details
  reason: {
    type: String,
    required: true
  },
  isEmergency: {
    type: Boolean,
    default: false
  },
  isShortLeave: {
    type: Boolean,
    default: false
  },
  
  // Approval workflow
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'cancelled'],
    default: 'pending'
  },
  
  // Manager approval
  managerApproval: {
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    approvedDate: Date,
    remarks: String
  },
  
  // HR approval
  hrApproval: {
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    approvedDate: Date,
    remarks: String
  },
  
  // Leave balance
  leaveBalance: {
    beforeLeave: Number,
    afterLeave: Number
  },
  
  // Cancellation
  cancellation: {
    isCancelled: {
      type: Boolean,
      default: false
    },
    cancelledDate: Date,
    cancelledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    cancellationReason: String
  },
  
  // System fields
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const leaveBalanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  leaveType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LeaveType',
    required: true
  },
  financialYear: {
    type: String,
    required: true // Format: "2023-2024"
  },
  
  // Balance details
  totalLeaves: {
    type: Number,
    required: true
  },
  usedLeaves: {
    type: Number,
    default: 0
  },
  remainingLeaves: {
    type: Number,
    required: true
  },
  
  // Carry forward
  carriedForward: {
    type: Number,
    default: 0
  },
  canCarryForward: {
    type: Boolean,
    default: false
  },
  maxCarryForward: {
    type: Number,
    default: 0
  },
  
  // Earned leaves
  earnedLeaves: {
    type: Number,
    default: 0
  },
  maxEarnedLeaves: {
    type: Number,
    default: 0
  },
  
  // Comp off
  compOffBalance: {
    type: Number,
    default: 0
  },
  
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes
leaveTypeSchema.index({ code: 1 });
leaveRequestSchema.index({ employee: 1, startDate: 1 });
leaveRequestSchema.index({ status: 1 });
leaveRequestSchema.index({ startDate: 1, endDate: 1 });
leaveBalanceSchema.index({ employee: 1, leaveType: 1, financialYear: 1 }, { unique: true });

// Pre-save middleware for leave request
leaveRequestSchema.pre('save', function(next) {
  if (this.startDate && this.endDate) {
    // Calculate number of days excluding weekends and holidays
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    if (this.isHalfDay) {
      this.numberOfDays = 0.5;
    } else {
      this.numberOfDays = diffDays;
    }
  }
  
  // Set leave balance before leave
  if (this.isNew) {
    // This would need to be populated from leave balance
    this.leaveBalance = {
      beforeLeave: 0,
      afterLeave: 0
    };
  }
  
  next();
});

// Static method to get leave balance for an employee
leaveBalanceSchema.statics.getLeaveBalance = async function(employeeId, leaveTypeId, financialYear) {
  const balance = await this.findOne({
    employee: employeeId,
    leaveType: leaveTypeId,
    financialYear: financialYear,
    isActive: true
  });
  
  return balance || {
    totalLeaves: 0,
    usedLeaves: 0,
    remainingLeaves: 0,
    carriedForward: 0,
    earnedLeaves: 0,
    compOffBalance: 0
  };
};

// Static method to update leave balance
leaveBalanceSchema.statics.updateLeaveBalance = async function(employeeId, leaveTypeId, financialYear, daysUsed) {
  const balance = await this.findOne({
    employee: employeeId,
    leaveType: leaveTypeId,
    financialYear: financialYear
  });
  
  if (balance) {
    balance.usedLeaves += daysUsed;
    balance.remainingLeaves = balance.totalLeaves - balance.usedLeaves;
    await balance.save();
  }
  
  return balance;
};

// Instance method to check if leave can be approved
leaveRequestSchema.methods.canBeApproved = function() {
  return this.status === 'pending' && 
         this.managerApproval.status === 'approved' && 
         this.hrApproval.status === 'approved';
};

// Instance method to get approval status
leaveRequestSchema.methods.getApprovalStatus = function() {
  if (this.status === 'cancelled') return 'Cancelled';
  if (this.status === 'rejected') return 'Rejected';
  if (this.status === 'approved') return 'Approved';
  
  if (this.managerApproval.status === 'rejected') return 'Rejected by Manager';
  if (this.hrApproval.status === 'rejected') return 'Rejected by HR';
  if (this.managerApproval.status === 'pending') return 'Pending Manager Approval';
  if (this.hrApproval.status === 'pending') return 'Pending HR Approval';
  
  return 'Pending';
};

// Virtual for leave duration
leaveRequestSchema.virtual('duration').get(function() {
  if (!this.startDate || !this.endDate) return 0;
  const start = new Date(this.startDate);
  const end = new Date(this.endDate);
  const diffTime = Math.abs(end - start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
});

// Export models
module.exports = {
  LeaveType: mongoose.model('LeaveType', leaveTypeSchema),
  LeaveRequest: mongoose.model('LeaveRequest', leaveRequestSchema),
  LeaveBalance: mongoose.model('LeaveBalance', leaveBalanceSchema)
};
