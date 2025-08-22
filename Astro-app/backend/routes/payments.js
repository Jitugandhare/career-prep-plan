import express from 'express';
import { body, validationResult } from 'express-validator';
import Razorpay from 'razorpay';

import { protect } from '../middleware/auth.js';

const router = express.Router();

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

console.log('Razorpay env vars:', {
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});


// @desc    Create payment order
// @route   POST /api/payments/create-order
// @access  Private
router.post('/create-order', protect, [
  body('amount').isFloat({ min: 1 }).withMessage('Amount must be at least 1'),
  body('currency').optional().isIn(['INR', 'USD']).withMessage('Currency must be INR or USD'),
  body('receipt').optional().isString().withMessage('Receipt must be a string'),
  body('notes').optional().isObject().withMessage('Notes must be an object')
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

    const { amount, currency = 'INR', receipt, notes } = req.body;

    const options = {
      amount: Math.round(amount * 100), // Razorpay expects amount in paise
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      notes: {
        userId: req.user.id,
        ...notes
      }
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt
      }
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment order'
    });
  }
});

// @desc    Verify payment signature
// @route   POST /api/payments/verify
// @access  Private
router.post('/verify', protect, [
  body('razorpay_order_id').isString().withMessage('Order ID is required'),
  body('razorpay_payment_id').isString().withMessage('Payment ID is required'),
  body('razorpay_signature').isString().withMessage('Signature is required')
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

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Verify the payment signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const crypto = await import('crypto');
    const signature = crypto.default
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest('hex');

    if (signature === razorpay_signature) {
      // Payment is verified
      res.json({
        success: true,
        message: 'Payment verified successfully',
        data: {
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid payment signature'
      });
    }
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify payment'
    });
  }
});

// @desc    Get payment details
// @route   GET /api/payments/:paymentId
// @access  Private
router.get('/:paymentId', protect, async (req, res) => {
  try {
    const payment = await razorpay.payments.fetch(req.params.paymentId);

    res.json({
      success: true,
      data: {
        paymentId: payment.id,
        orderId: payment.order_id,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
        method: payment.method,
        description: payment.description,
        email: payment.email,
        contact: payment.contact,
        createdAt: payment.created_at
      }
    });
  } catch (error) {
    console.error('Get payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get payment details'
    });
  }
});

// @desc    Get order details
// @route   GET /api/payments/order/:orderId
// @access  Private
router.get('/order/:orderId', protect, async (req, res) => {
  try {
    const order = await razorpay.orders.fetch(req.params.orderId);

    res.json({
      success: true,
      data: {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        status: order.status,
        notes: order.notes,
        createdAt: order.created_at
      }
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get order details'
    });
  }
});

// @desc    Refund payment
// @route   POST /api/payments/refund
// @access  Private
router.post('/refund', protect, [
  body('paymentId').isString().withMessage('Payment ID is required'),
  body('amount').optional().isFloat({ min: 1 }).withMessage('Amount must be at least 1'),
  body('reason').optional().isString().withMessage('Reason must be a string')
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

    const { paymentId, amount, reason } = req.body;

    const refundOptions = {
      payment_id: paymentId,
      ...(amount && { amount: Math.round(amount * 100) }),
      ...(reason && { reason })
    };

    const refund = await razorpay.payments.refund(refundOptions);

    res.json({
      success: true,
      message: 'Refund processed successfully',
      data: {
        refundId: refund.id,
        paymentId: refund.payment_id,
        amount: refund.amount,
        status: refund.status,
        createdAt: refund.created_at
      }
    });
  } catch (error) {
    console.error('Refund error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process refund'
    });
  }
});

export default router;

