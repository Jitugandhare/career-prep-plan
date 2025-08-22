import express from 'express';
import { body, validationResult } from 'express-validator';
import Booking from '../models/Booking.js';
import Astrologer from '../models/Astrologer.js';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Create a booking
// @route   POST /api/bookings
// @access  Private
router.post('/', protect, [
  body('astrologerId').isMongoId().withMessage('Valid astrologer ID is required'),
  body('type').isIn(['call', 'chat', 'video_call']).withMessage('Valid booking type is required'),
  body('scheduledAt').isISO8601().withMessage('Valid scheduled date is required'),
  body('duration').isInt({ min: 5, max: 120 }).withMessage('Duration must be between 5 and 120 minutes'),
  body('paymentMethod').isIn(['wallet', 'card', 'upi', 'net_banking', 'cash']).withMessage('Valid payment method is required')
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

    const {
      astrologerId,
      type,
      scheduledAt,
      duration,
      paymentMethod,
      topic,
      description,
      questions,
      birthDetails
    } = req.body;

    // Check if astrologer exists and is approved
    const astrologer = await Astrologer.findById(astrologerId);
    if (!astrologer) {
      return res.status(404).json({
        success: false,
        message: 'Astrologer not found'
      });
    }

    if (!astrologer.isApproved) {
      return res.status(400).json({
        success: false,
        message: 'Astrologer is not approved for consultations'
      });
    }

    // Check if scheduled time is in the future
    const scheduledTime = new Date(scheduledAt);
    if (scheduledTime <= new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Scheduled time must be in the future'
      });
    }

    // Calculate amount based on type and duration
    let amount = 0;
    if (type === 'call') {
      amount = astrologer.callRate * duration;
    } else if (type === 'chat') {
      amount = astrologer.chatRate * Math.ceil(duration / 10); // Assuming 10 minutes per chat message
    } else if (type === 'video_call') {
      amount = (astrologer.videoCallRate || astrologer.callRate * 1.5) * duration;
    }

    // Check if user has sufficient wallet balance for wallet payment
    if (paymentMethod === 'wallet') {
      const user = await User.findById(req.user.id);
      if (user.wallet.balance < amount) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient wallet balance'
        });
      }
    }

    // Check for booking conflicts
    const conflictingBooking = await Booking.findOne({
      astrologer: astrologerId,
      scheduledAt: {
        $gte: new Date(scheduledTime.getTime() - duration * 60000),
        $lte: new Date(scheduledTime.getTime() + duration * 60000)
      },
      status: { $in: ['pending', 'confirmed'] }
    });

    if (conflictingBooking) {
      return res.status(400).json({
        success: false,
        message: 'Time slot is not available'
      });
    }

    // Create booking
    const booking = await Booking.create({
      user: req.user.id,
      astrologer: astrologerId,
      type,
      scheduledAt: scheduledTime,
      duration,
      amount,
      paymentMethod,
      topic,
      description,
      questions,
      birthDetails
    });

    // Process wallet payment if applicable
    if (paymentMethod === 'wallet') {
      const user = await User.findById(req.user.id);
      user.wallet.balance -= amount;
      await user.save();

      booking.paymentStatus = 'paid';
      await booking.save();
    }

    const populatedBooking = await Booking.findById(booking._id)
      .populate('user', 'name email')
      .populate({
        path: 'astrologer',
        populate: { path: 'user', select: 'name email profileImage' }
      });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: { booking: populatedBooking }
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get user's bookings
// @route   GET /api/bookings
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { status, type } = req.query;

    // Build filter object
    const filter = { user: req.user.id };
    
    if (status) {
      filter.status = status;
    }
    
    if (type) {
      filter.type = type;
    }

    const bookings = await Booking.find(filter)
      .populate({
        path: 'astrologer',
        populate: { path: 'user', select: 'name email profileImage' }
      })
      .sort({ scheduledAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Booking.countDocuments(filter);

    res.json({
      success: true,
      data: {
        bookings,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get astrologer's bookings
// @route   GET /api/bookings/astrologer
// @access  Private (Astrologer)
router.get('/astrologer', protect, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { status, type, date } = req.query;

    // Get astrologer profile
    const astrologer = await Astrologer.findOne({ user: req.user.id });
    if (!astrologer) {
      return res.status(404).json({
        success: false,
        message: 'Astrologer profile not found'
      });
    }

    // Build filter object
    const filter = { astrologer: astrologer._id };
    
    if (status) {
      filter.status = status;
    }
    
    if (type) {
      filter.type = type;
    }
    
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      filter.scheduledAt = {
        $gte: startDate,
        $lt: endDate
      };
    }

    const bookings = await Booking.find(filter)
      .populate('user', 'name email phone')
      .sort({ scheduledAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Booking.countDocuments(filter);

    res.json({
      success: true,
      data: {
        bookings,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get astrologer bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'name email phone')
      .populate({
        path: 'astrologer',
        populate: { path: 'user', select: 'name email profileImage' }
      });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user is authorized to view this booking
    if (booking.user._id.toString() !== req.user.id && 
        booking.astrologer.user._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this booking'
      });
    }

    res.json({
      success: true,
      data: { booking }
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private
router.put('/:id/status', protect, [
  body('status').isIn(['confirmed', 'cancelled', 'completed', 'no_show']).withMessage('Valid status is required'),
  body('cancellationReason').optional().isLength({ max: 200 }).withMessage('Cancellation reason cannot exceed 200 characters')
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

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    const { status, cancellationReason, cancelledBy } = req.body;

    // Check if user is authorized to update this booking
    const astrologer = await Astrologer.findOne({ user: req.user.id });
    const isAstrologer = astrologer && astrologer._id.toString() === booking.astrologer.toString();
    const isUser = booking.user.toString() === req.user.id;

    if (!isAstrologer && !isUser) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this booking'
      });
    }

    // Update booking
    booking.status = status;
    
    if (status === 'cancelled') {
      booking.cancellationReason = cancellationReason;
      booking.cancelledBy = cancelledBy || (isUser ? 'user' : 'astrologer');
      booking.cancellationTime = new Date();
      
      // Process refund if payment was made
      if (booking.paymentStatus === 'paid' && booking.paymentMethod === 'wallet') {
        const user = await User.findById(booking.user);
        user.wallet.balance += booking.amount;
        await user.save();
        
        booking.paymentStatus = 'refunded';
        booking.refundAmount = booking.amount;
      }
    }

    await booking.save();

    const updatedBooking = await Booking.findById(booking._id)
      .populate('user', 'name email')
      .populate({
        path: 'astrologer',
        populate: { path: 'user', select: 'name email profileImage' }
      });

    res.json({
      success: true,
      message: 'Booking status updated successfully',
      data: { booking: updatedBooking }
    });
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Add rating and review to booking
// @route   POST /api/bookings/:id/review
// @access  Private
router.post('/:id/review', protect, [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('review').optional().isLength({ max: 500 }).withMessage('Review cannot exceed 500 characters')
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

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user is authorized to review this booking
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to review this booking'
      });
    }

    // Check if booking is completed
    if (booking.status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Can only review completed bookings'
      });
    }

    // Check if already reviewed
    if (booking.rating) {
      return res.status(400).json({
        success: false,
        message: 'Booking has already been reviewed'
      });
    }

    const { rating, review } = req.body;

    // Update booking
    booking.rating = rating;
    booking.review = review;
    await booking.save();

    // Update astrologer's rating
    const astrologer = await Astrologer.findById(booking.astrologer);
    if (astrologer) {
      const totalRating = astrologer.reviews.reduce((sum, r) => sum + r.rating, 0) + rating;
      astrologer.totalRatings += 1;
      astrologer.rating = totalRating;
      await astrologer.save();
    }

    const updatedBooking = await Booking.findById(booking._id)
      .populate('user', 'name email')
      .populate({
        path: 'astrologer',
        populate: { path: 'user', select: 'name email profileImage' }
      });

    res.json({
      success: true,
      message: 'Review added successfully',
      data: { booking: updatedBooking }
    });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
