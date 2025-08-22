import mongoose from 'mongoose';

const astrologerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  experience: {
    type: Number,
    required: [true, 'Please add years of experience'],
    min: [0, 'Experience cannot be negative']
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be negative'],
    max: [5, 'Rating cannot exceed 5']
  },
  totalRatings: {
    type: Number,
    default: 0
  },
  specialties: [{
    type: String,
    enum: [
      'Vedic Astrology',
      'Tarot Reading',
      'Palmistry',
      'Numerology',
      'KP Astrology',
      'Face Reading',
      'Gemstones',
      'Vastu',
      'Horary Astrology',
      'Love & Relationships',
      'Career',
      'Marriage',
      'Business',
      'Health',
      'Family'
    ]
  }],
  languages: [{
    type: String,
    enum: ['English', 'Hindi', 'Sanskrit', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Bengali', 'Gujarati', 'Marathi']
  }],
  callRate: {
    type: Number,
    required: [true, 'Please add call rate per minute'],
    min: [0, 'Call rate cannot be negative']
  },
  chatRate: {
    type: Number,
    required: [true, 'Please add chat rate per message'],
    min: [0, 'Chat rate cannot be negative']
  },
  videoCallRate: {
    type: Number,
    min: [0, 'Video call rate cannot be negative']
  },
  availability: {
    monday: { start: String, end: String, available: { type: Boolean, default: true } },
    tuesday: { start: String, end: String, available: { type: Boolean, default: true } },
    wednesday: { start: String, end: String, available: { type: Boolean, default: true } },
    thursday: { start: String, end: String, available: { type: Boolean, default: true } },
    friday: { start: String, end: String, available: { type: Boolean, default: true } },
    saturday: { start: String, end: String, available: { type: Boolean, default: true } },
    sunday: { start: String, end: String, available: { type: Boolean, default: true } }
  },
  isOnline: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot be more than 500 characters']
  },
  education: [{
    degree: String,
    institution: String,
    year: Number
  }],
  certifications: [{
    name: String,
    issuingAuthority: String,
    year: Number,
    certificateUrl: String
  }],
  achievements: [String],
  totalConsultations: {
    type: Number,
    default: 0
  },
  totalEarnings: {
    type: Number,
    default: 0
  },
  averageRating: {
    type: Number,
    default: 0
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  documents: {
    idProof: String,
    addressProof: String,
    qualificationCertificates: [String]
  },
  bankDetails: {
    accountNumber: String,
    ifscCode: String,
    accountHolderName: String,
    bankName: String
  }
}, {
  timestamps: true
});

// Virtual for average rating calculation
astrologerSchema.virtual('averageRatingCalculated').get(function() {
  if (this.totalRatings === 0) return 0;
  return (this.rating / this.totalRatings).toFixed(1);
});

// Index for search functionality
astrologerSchema.index({ 
  'user.name': 'text', 
  specialties: 'text', 
  languages: 'text',
  bio: 'text'
});

export default mongoose.model('Astrologer', astrologerSchema);
