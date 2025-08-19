const mongoose = require('mongoose');

const salaryStructureSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  effectiveDate: {
    type: Date,
    required: true
  },
  
  // Basic salary components
  ctc: {
    type: Number,
    required: true
  },
  basic: {
    type: Number,
    required: true
  },
  hra: {
    type: Number,
    required: true
  },
  da: {
    type: Number,
    default: 0
  },
  
  // Allowances
  allowances: {
    medical: { type: Number, default: 0 },
    conveyance: { type: Number, default: 0 },
    telephone: { type: Number, default: 0 },
    travel: { type: Number, default: 0 },
    entertainment: { type: Number, default: 0 },
    childEducation: { type: Number, default: 0 },
    lunch: { type: Number, default: 0 },
    lta: { type: Number, default: 0 },
    uniform: { type: Number, default: 0 },
    books: { type: Number, default: 0 },
    cca: { type: Number, default: 0 },
    driver: { type: Number, default: 0 },
    miscellaneous: { type: Number, default: 0 }
  },
  
  // Variable components
  variable: {
    type: String,
    enum: ['percentage', 'fixed'],
    default: 'percentage'
  },
  variableValue: {
    type: Number,
    default: 0
  },
  variableBase: {
    type: String,
    enum: ['ctc', 'basic', 'gross'],
    default: 'ctc'
  },
  
  // Statutory deductions
  statutoryDeductions: {
    pfEmployee: {
      type: Number,
      default: 12 // percentage
    },
    pfEmployer: {
      type: Number,
      default: 12 // percentage
    },
    esiEmployee: {
      type: Number,
      default: 0.75 // percentage
    },
    esiEmployer: {
      type: Number,
      default: 3.25 // percentage
    }
  },
  
  // Status
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const salarySlipSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  month: {
    type: Number,
    required: true,
    min: 1,
    max: 12
  },
  year: {
    type: Number,
    required: true
  },
  
  // Basic info
  salaryStructure: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SalaryStructure',
    required: true
  },
  
  // Earnings
  earnings: {
    basic: { type: Number, default: 0 },
    hra: { type: Number, default: 0 },
    da: { type: Number, default: 0 },
    allowances: {
      medical: { type: Number, default: 0 },
      conveyance: { type: Number, default: 0 },
      telephone: { type: Number, default: 0 },
      travel: { type: Number, default: 0 },
      entertainment: { type: Number, default: 0 },
      childEducation: { type: Number, default: 0 },
      lunch: { type: Number, default: 0 },
      lta: { type: Number, default: 0 },
      uniform: { type: Number, default: 0 },
      books: { type: Number, default: 0 },
      cca: { type: Number, default: 0 },
      driver: { type: Number, default: 0 },
      miscellaneous: { type: Number, default: 0 }
    },
    variable: { type: Number, default: 0 },
    extraEarnedWages: { type: Number, default: 0 },
    incentives: { type: Number, default: 0 },
    gratuity: { type: Number, default: 0 },
    trainingAllowance: { type: Number, default: 0 }
  },
  
  // Deductions
  deductions: {
    pfEmployee: { type: Number, default: 0 },
    esiEmployee: { type: Number, default: 0 },
    tds: { type: Number, default: 0 },
    bankLoan: { type: Number, default: 0 },
    advance: { type: Number, default: 0 },
    penalties: { type: Number, default: 0 },
    absenteeism: { type: Number, default: 0 },
    lateComings: { type: Number, default: 0 },
    otherDeductions: { type: Number, default: 0 }
  },
  
  // Working days
  workingDays: {
    totalDays: { type: Number, default: 0 },
    presentDays: { type: Number, default: 0 },
    absentDays: { type: Number, default: 0 },
    leaveDays: { type: Number, default: 0 },
    holidays: { type: Number, default: 0 },
    weeklyOffs: { type: Number, default: 0 }
  },
  
  // Calculations
  grossEarnings: { type: Number, default: 0 },
  totalDeductions: { type: Number, default: 0 },
  netPay: { type: Number, default: 0 },
  
  // Status
  status: {
    type: String,
    enum: ['draft', 'generated', 'approved', 'paid'],
    default: 'draft'
  },
  
  // Approval
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedDate: Date,
  
  // Payment
  paymentDate: Date,
  paymentMode: {
    type: String,
    enum: ['bank_transfer', 'cash', 'cheque']
  },
  
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const pfNomineeSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // PF details
  uan: {
    type: String,
    required: true,
    unique: true
  },
  registrationDate: {
    type: Date,
    required: true
  },
  pfStartDate: {
    type: Date,
    required: true
  },
  pfEndDate: Date,
  
  // PF type
  pfType: {
    type: String,
    enum: ['required_voluntary', 'continued_pf', 'required_continued', 'voluntary_continued'],
    required: true
  },
  
  // Registration details
  registeredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  // Status
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const esicNomineeSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // ESIC details
  esicNumber: {
    type: String,
    required: true,
    unique: true
  },
  registrationDate: {
    type: Date,
    required: true
  },
  
  // Contribution period
  contributionPeriod: {
    startDate: Date,
    endDate: Date
  },
  
  // Status
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes
salaryStructureSchema.index({ employee: 1, effectiveDate: 1 });
salarySlipSchema.index({ employee: 1, month: 1, year: 1 }, { unique: true });
salarySlipSchema.index({ month: 1, year: 1 });
pfNomineeSchema.index({ uan: 1 });
esicNomineeSchema.index({ esicNumber: 1 });

// Pre-save middleware for salary structure
salaryStructureSchema.pre('save', function(next) {
  // Calculate basic salary based on CTC
  if (this.ctc && !this.basic) {
    if (this.ctc <= 20000) {
      this.basic = this.ctc * 0.6; // 60% of CTC
    } else {
      this.basic = this.ctc * 0.4; // 40% of CTC
    }
  }
  
  // Calculate HRA if not provided
  if (this.basic && !this.hra) {
    this.hra = this.basic * 0.5; // 50% of basic
  }
  
  next();
});

// Pre-save middleware for salary slip
salarySlipSchema.pre('save', function(next) {
  // Calculate gross earnings
  const allowances = Object.values(this.earnings.allowances).reduce((sum, val) => sum + val, 0);
  this.grossEarnings = this.earnings.basic + this.earnings.hra + this.earnings.da + allowances + 
                       this.earnings.variable + this.earnings.extraEarnedWages + 
                       this.earnings.incentives + this.earnings.gratuity + this.earnings.trainingAllowance;
  
  // Calculate total deductions
  this.totalDeductions = this.deductions.pfEmployee + this.deductions.esiEmployee + 
                         this.deductions.tds + this.deductions.bankLoan + this.deductions.advance + 
                         this.deductions.penalties + this.deductions.absenteeism + 
                         this.deductions.lateComings + this.deductions.otherDeductions;
  
  // Calculate net pay
  this.netPay = this.grossEarnings - this.totalDeductions;
  
  next();
});

// Static method to calculate PF contribution
salaryStructureSchema.statics.calculatePF = function(basic, isEmployee = true) {
  if (basic <= 15000) {
    return isEmployee ? basic * 0.12 : basic * 0.12;
  } else {
    return isEmployee ? 1800 : basic * 0.12;
  }
};

// Static method to calculate ESIC contribution
salaryStructureSchema.statics.calculateESIC = function(grossSalary, isEmployee = true) {
  if (grossSalary > 21000) {
    return 0;
  } else {
    return isEmployee ? grossSalary * 0.0075 : grossSalary * 0.0325;
  }
};

// Instance method to get total allowances
salaryStructureSchema.methods.getTotalAllowances = function() {
  return Object.values(this.allowances).reduce((sum, val) => sum + val, 0);
};

// Instance method to get gross salary
salaryStructureSchema.methods.getGrossSalary = function() {
  return this.basic + this.hra + this.da + this.getTotalAllowances();
};

// Virtual for total earnings
salarySlipSchema.virtual('totalEarnings').get(function() {
  return this.grossEarnings;
});

// Virtual for total deductions
salarySlipSchema.virtual('totalDeductions').get(function() {
  return this.totalDeductions;
});

// Export models
module.exports = {
  SalaryStructure: mongoose.model('SalaryStructure', salaryStructureSchema),
  SalarySlip: mongoose.model('SalarySlip', salarySlipSchema),
  PFNominee: mongoose.model('PFNominee', pfNomineeSchema),
  ESICNominee: mongoose.model('ESICNominee', esicNomineeSchema)
};
