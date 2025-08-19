const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  shift: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShiftCategory',
    required: true
  },
  
  // Clock in/out times
  clockIn: {
    time: Date,
    location: {
      type: { type: String, enum: ['gps', 'manual', 'face_recognition'] },
      coordinates: {
        latitude: Number,
        longitude: Number
      },
      address: String
    },
    isLate: {
      type: Boolean,
      default: false
    },
    lateMinutes: Number
  },
  
  clockOut: {
    time: Date,
    location: {
      type: { type: String, enum: ['gps', 'manual', 'face_recognition'] },
      coordinates: {
        latitude: Number,
        longitude: Number
      },
      address: String
    }
  },
  
  // Working hours calculation
  totalWorkingHours: Number, // in hours
  overtimeHours: Number, // in hours
  breakTime: Number, // in minutes
  
  // Status and remarks
  status: {
    type: String,
    enum: ['present', 'absent', 'half_day', 'leave', 'holiday', 'weekly_off'],
    default: 'present'
  },
  remarks: String,
  
  // Late coming waiver
  lateComingWaiver: {
    isRequested: {
      type: Boolean,
      default: false
    },
    reason: String,
    requestDate: Date,
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    approvalDate: Date,
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    remarks: String
  },
  
  // Manual entry
  isManualEntry: {
    type: Boolean,
    default: false
  },
  manualEntryBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  manualEntryReason: String,
  
  // System fields
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for performance
attendanceSchema.index({ employee: 1, date: 1 }, { unique: true });
attendanceSchema.index({ date: 1 });
attendanceSchema.index({ employee: 1 });
attendanceSchema.index({ status: 1 });

// Pre-save middleware to calculate working hours
attendanceSchema.pre('save', function(next) {
  if (this.clockIn && this.clockOut) {
    const clockInTime = new Date(this.clockIn.time);
    const clockOutTime = new Date(this.clockOut.time);
    
    // Calculate total working hours
    const diffMs = clockOutTime - clockInTime;
    this.totalWorkingHours = Math.round((diffMs / (1000 * 60 * 60)) * 100) / 100;
    
    // Calculate overtime (assuming 8 hours is standard)
    const standardHours = 8;
    if (this.totalWorkingHours > standardHours) {
      this.overtimeHours = Math.round((this.totalWorkingHours - standardHours) * 100) / 100;
    }
  }
  
  // Check if late coming
  if (this.clockIn && this.shift) {
    // This would need to be populated with shift details
    // For now, we'll set a basic check
    this.clockIn.isLate = false;
  }
  
  next();
});

// Static method to get attendance summary for an employee
attendanceSchema.statics.getAttendanceSummary = async function(employeeId, startDate, endDate) {
  const attendance = await this.find({
    employee: employeeId,
    date: { $gte: startDate, $lte: endDate },
    isActive: true
  }).populate('shift');
  
  const summary = {
    totalDays: attendance.length,
    presentDays: attendance.filter(a => a.status === 'present').length,
    absentDays: attendance.filter(a => a.status === 'absent').length,
    halfDays: attendance.filter(a => a.status === 'half_day').length,
    leaveDays: attendance.filter(a => a.status === 'leave').length,
    totalWorkingHours: attendance.reduce((sum, a) => sum + (a.totalWorkingHours || 0), 0),
    totalOvertimeHours: attendance.reduce((sum, a) => sum + (a.overtimeHours || 0), 0),
    lateComingCount: attendance.filter(a => a.clockIn && a.clockIn.isLate).length
  };
  
  return summary;
};

// Static method to check if date is holiday or weekly off
attendanceSchema.statics.isHolidayOrWeeklyOff = async function(date, shiftId) {
  // This would need to be implemented based on holiday and shift data
  // For now, returning false
  return false;
};

// Instance method to calculate late coming penalty
attendanceSchema.methods.calculateLatePenalty = function() {
  if (!this.clockIn || !this.clockIn.isLate) return 0;
  
  const lateMinutes = this.clockIn.lateMinutes || 0;
  
  if (lateMinutes <= 15) return 0; // Grace period
  if (lateMinutes <= 30) return 0.25; // 1 unit = 1/4 day
  if (lateMinutes <= 45) return 0.5;  // 2 units = 1/2 day
  return 1; // Full day deduction
};

// Virtual for working hours formatted
attendanceSchema.virtual('workingHoursFormatted').get(function() {
  if (!this.totalWorkingHours) return '0h 0m';
  const hours = Math.floor(this.totalWorkingHours);
  const minutes = Math.round((this.totalWorkingHours - hours) * 60);
  return `${hours}h ${minutes}m`;
});

// Virtual for overtime hours formatted
attendanceSchema.virtual('overtimeHoursFormatted').get(function() {
  if (!this.overtimeHours) return '0h 0m';
  const hours = Math.floor(this.overtimeHours);
  const minutes = Math.round((this.overtimeHours - hours) * 60);
  return `${hours}h ${minutes}m`;
});

module.exports = mongoose.model('Attendance', attendanceSchema);
