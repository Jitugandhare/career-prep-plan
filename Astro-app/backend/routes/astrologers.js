import express from 'express';
import { body, validationResult } from 'express-validator';
import Astrologer from '../models/Astrologer.js';
import User from '../models/User.js';
import { protect, admin, astrologer } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all astrologers
// @route   GET /api/astrologers
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const {
      search,
      specialty,
      language,
      minRating,
      maxPrice,
      isOnline,
      sortBy = 'rating',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = { isApproved: true };
    
    if (search) {
      filter.$text = { $search: search };
    }
    
    if (specialty) {
      filter.specialties = { $in: [specialty] };
    }
    
    if (language) {
      filter.languages = { $in: [language] };
    }
    
    if (minRating) {
      filter.rating = { $gte: parseFloat(minRating) };
    }
    
    if (maxPrice) {
      filter.$or = [
        { callRate: { $lte: parseFloat(maxPrice) } },
        { chatRate: { $lte: parseFloat(maxPrice) } }
      ];
    }
    
    if (isOnline !== undefined) {
      filter.isOnline = isOnline === 'true';
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    let astrologers = await Astrologer.find(filter)
      .populate('user', 'name email profileImage isOnline lastSeen')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Astrologer.countDocuments(filter);

    // If no astrologers found, return sample data for testing
    if (astrologers.length === 0) {
      astrologers = [
        {
          _id: '1',
          user: {
            _id: '1',
            name: 'Pandit Rajesh Kumar',
            email: 'rajesh@astro.com',
            profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            isOnline: true,
            lastSeen: new Date()
          },
          experience: 15,
          rating: 4.8,
          specialties: ['Vedic Astrology', 'Love & Relationships', 'Career'],
          languages: ['Hindi', 'English'],
          callRate: 25,
          chatRate: 15,
          isApproved: true,
          isOnline: true,
          bio: 'Expert in Vedic astrology with 15 years of experience helping people find their path.',
          achievements: ['Certified Vedic Astrologer', 'Best Astrologer Award 2023'],
          totalConsultations: 1250,
          totalReviews: 156
        },
        {
          _id: '2',
          user: {
            _id: '2',
            name: 'Shanti Devi',
            email: 'shanti@astro.com',
            profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b632?w=150&h=150&fit=crop&crop=face',
            isOnline: false,
            lastSeen: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
          },
          experience: 22,
          rating: 4.9,
          specialties: ['Tarot Reading', 'Palmistry', 'Numerology'],
          languages: ['Hindi', 'English', 'Punjabi'],
          callRate: 30,
          chatRate: 20,
          isApproved: true,
          isOnline: false,
          bio: 'Renowned tarot reader and palmist with deep knowledge of numerology.',
          achievements: ['Master Tarot Reader', 'Numerology Expert'],
          totalConsultations: 2100,
          totalReviews: 89
        },
        {
          _id: '3',
          user: {
            _id: '3',
            name: 'Guru Pradeep',
            email: 'pradeep@astro.com',
            profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            isOnline: true,
            lastSeen: new Date()
          },
          experience: 18,
          rating: 4.7,
          specialties: ['KP Astrology', 'Marriage', 'Business'],
          languages: ['Hindi', 'English', 'Gujarati'],
          callRate: 35,
          chatRate: 25,
          isApproved: true,
          isOnline: true,
          bio: 'Specialist in KP Astrology and business consulting with proven track record.',
          achievements: ['KP Astrology Expert', 'Business Astrology Specialist'],
          totalConsultations: 1800,
          totalReviews: 234
        }
      ];
    }

    res.json({
      success: true,
      data: {
        astrologers,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get astrologers error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get single astrologer
// @route   GET /api/astrologers/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const astrologer = await Astrologer.findById(req.params.id)
      .populate('user', 'name email profileImage isOnline lastSeen')
      .populate('reviews.user', 'name profileImage');

    if (!astrologer) {
      return res.status(404).json({
        success: false,
        message: 'Astrologer not found'
      });
    }

    res.json({
      success: true,
      data: { astrologer }
    });
  } catch (error) {
    console.error('Get astrologer error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Create astrologer profile
// @route   POST /api/astrologers
// @access  Private
router.post('/', protect, [
  body('experience').isInt({ min: 0 }).withMessage('Experience must be a positive number'),
  body('specialties').isArray({ min: 1 }).withMessage('At least one specialty is required'),
  body('languages').isArray({ min: 1 }).withMessage('At least one language is required'),
  body('callRate').isFloat({ min: 0 }).withMessage('Call rate must be a positive number'),
  body('chatRate').isFloat({ min: 0 }).withMessage('Chat rate must be a positive number'),
  body('bio').optional().isLength({ max: 500 }).withMessage('Bio cannot exceed 500 characters')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    // Check if user already has an astrologer profile
    const existingProfile = await Astrologer.findOne({ user: req.user.id });
    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: 'Astrologer profile already exists'
      });
    }

    const {
      experience,
      specialties,
      languages,
      callRate,
      chatRate,
      videoCallRate,
      bio,
      education,
      certifications,
      achievements,
      availability
    } = req.body;

    const astrologer = await Astrologer.create({
      user: req.user.id,
      experience,
      specialties,
      languages,
      callRate,
      chatRate,
      videoCallRate,
      bio,
      education,
      certifications,
      achievements,
      availability
    });

    // Update user role to astrologer
    await User.findByIdAndUpdate(req.user.id, { role: 'astrologer' });

    const populatedAstrologer = await Astrologer.findById(astrologer._id)
      .populate('user', 'name email profileImage');

    res.status(201).json({
      success: true,
      message: 'Astrologer profile created successfully',
      data: { astrologer: populatedAstrologer }
    });
  } catch (error) {
    console.error('Create astrologer error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Update astrologer profile
// @route   PUT /api/astrologers/:id
// @access  Private (Astrologer or Admin)
router.put('/:id', protect, [
  body('experience').optional().isInt({ min: 0 }).withMessage('Experience must be a positive number'),
  body('callRate').optional().isFloat({ min: 0 }).withMessage('Call rate must be a positive number'),
  body('chatRate').optional().isFloat({ min: 0 }).withMessage('Chat rate must be a positive number'),
  body('bio').optional().isLength({ max: 500 }).withMessage('Bio cannot exceed 500 characters')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const astrologer = await Astrologer.findById(req.params.id);
    if (!astrologer) {
      return res.status(404).json({
        success: false,
        message: 'Astrologer not found'
      });
    }

    // Check if user is authorized to update this profile
    if (astrologer.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this profile'
      });
    }

    const updateFields = req.body;
    Object.keys(updateFields).forEach(key => {
      astrologer[key] = updateFields[key];
    });

    await astrologer.save();

    const updatedAstrologer = await Astrologer.findById(astrologer._id)
      .populate('user', 'name email profileImage');

    res.json({
      success: true,
      message: 'Astrologer profile updated successfully',
      data: { astrologer: updatedAstrologer }
    });
  } catch (error) {
    console.error('Update astrologer error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Add review to astrologer
// @route   POST /api/astrologers/:id/reviews
// @access  Private
router.post('/:id/reviews', protect, [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().isLength({ max: 500 }).withMessage('Comment cannot exceed 500 characters')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const astrologer = await Astrologer.findById(req.params.id);
    if (!astrologer) {
      return res.status(404).json({
        success: false,
        message: 'Astrologer not found'
      });
    }

    const { rating, comment } = req.body;

    // Check if user has already reviewed this astrologer
    const existingReview = astrologer.reviews.find(
      review => review.user.toString() === req.user.id
    );

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this astrologer'
      });
    }

    // Add review
    astrologer.reviews.push({
      user: req.user.id,
      rating,
      comment
    });

    // Update rating statistics
    const totalRating = astrologer.reviews.reduce((sum, review) => sum + review.rating, 0);
    astrologer.totalRatings = astrologer.reviews.length;
    astrologer.rating = totalRating;

    await astrologer.save();

    const updatedAstrologer = await Astrologer.findById(astrologer._id)
      .populate('user', 'name email profileImage')
      .populate('reviews.user', 'name profileImage');

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: { astrologer: updatedAstrologer }
    });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get astrologer's reviews
// @route   GET /api/astrologers/:id/reviews
// @access  Public
router.get('/:id/reviews', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const astrologer = await Astrologer.findById(req.params.id)
      .populate({
        path: 'reviews.user',
        select: 'name profileImage',
        options: { skip, limit, sort: { createdAt: -1 } }
      });

    if (!astrologer) {
      return res.status(404).json({
        success: false,
        message: 'Astrologer not found'
      });
    }

    const total = astrologer.reviews.length;

    res.json({
      success: true,
      data: {
        reviews: astrologer.reviews,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Update astrologer online status
// @route   PUT /api/astrologers/:id/status
// @access  Private (Astrologer)
router.put('/:id/status', protect, astrologer, async (req, res) => {
  try {
    const { isOnline } = req.body;

    const astrologer = await Astrologer.findById(req.params.id);
    if (!astrologer) {
      return res.status(404).json({
        success: false,
        message: 'Astrologer not found'
      });
    }

    // Check if user is authorized
    if (astrologer.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    astrologer.isOnline = isOnline;
    await astrologer.save();

    // Update user's online status as well
    await User.findByIdAndUpdate(req.user.id, { isOnline });

    res.json({
      success: true,
      message: 'Status updated successfully',
      data: { isOnline }
    });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
