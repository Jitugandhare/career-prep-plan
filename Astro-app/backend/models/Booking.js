import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  astrologer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Astrologer',
    required: true
  },
  type: {
    type: String,
    enum: ['call', 'chat', 'video_call'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show'],
    default: 'pending'
  },
  scheduledAt: {
    type: Date,
    required: true
  },
  duration: {
    type: Number, // in minutes
    required: true,
    min: [5, 'Duration must be at least 5 minutes'],
    max: [120, 'Duration cannot exceed 120 minutes']
  },
  amount: {
    type: Number,
    required: true,
    min: [0, 'Amount cannot be negative']
  },
  currency: {
    type: String,
    default: 'INR'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String,
    enum: ['wallet', 'card', 'upi', 'net_banking', 'cash'],
    required: true
  },
  paymentId: String,
  topic: {
    type: String,
    maxlength: [200, 'Topic cannot be more than 200 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  questions: [String],
  birthDetails: {
    dateOfBirth: Date,
    timeOfBirth: String,
    placeOfBirth: String
  },
  actualStartTime: Date,
  actualEndTime: Date,
  actualDuration: Number, // in minutes
  notes: {
    astrologer: String,
    user: String
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  review: {
    type: String,
    maxlength: [500, 'Review cannot be more than 500 characters']
  },
  cancellationReason: String,
  cancelledBy: {
    type: String,
    enum: ['user', 'astrologer', 'system']
  },
  cancellationTime: Date,
  refundAmount: {
    type: Number,
    min: [0, 'Refund amount cannot be negative']
  },
  reminderSent: {
    type: Boolean,
    default: false
  },
  reminderTime: Date,
  isRescheduled: {
    type: Boolean,
    default: false
  },
  originalBooking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  }
}, {
  timestamps: true
});

// Virtual for total amount calculation
bookingSchema.virtual('totalAmount').get(function() {
  return this.amount;
});

// Virtual for booking status
bookingSchema.virtual('isUpcoming').get(function() {
  return this.status === 'confirmed' && this.scheduledAt > new Date();
});

bookingSchema.virtual('isPast').get(function() {
  return this.scheduledAt < new Date();
});

// Index for efficient queries
bookingSchema.index({ user: 1, scheduledAt: -1 });
bookingSchema.index({ astrologer: 1, scheduledAt: -1 });
bookingSchema.index({ status: 1, scheduledAt: 1 });

export default mongoose.model('Booking', bookingSchema);
