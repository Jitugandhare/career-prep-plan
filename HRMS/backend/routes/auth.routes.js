const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/auth.controller.js');
const { verifyToken, isAdmin, isSuperAdmin } = require('../middleware/auth.js');
const { asyncHandler } = require('../middleware/errorHandler.js');

// Validation middleware
const validateRegistration = [
  body('fullName').trim().isLength({ min: 2, max: 100 }).withMessage('Full name must be between 2 and 100 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('role').optional().isIn(['super_admin', 'admin', 'manager', 'employee']).withMessage('Invalid role'),
  body('department').isMongoId().withMessage('Valid department ID is required'),
  body('section').optional().isMongoId().withMessage('Valid section ID is required'),
  body('designation').trim().notEmpty().withMessage('Designation is required'),
  body('dateOfJoining').isISO8601().withMessage('Valid joining date is required'),
  body('employeeCategory').optional().isIn(['general_1', 'general_2', 'support', 'housekeeping', 'general_flexi']).withMessage('Invalid employee category'),
  body('dateOfBirth').optional().isISO8601().withMessage('Valid birth date is required'),
  body('gender').optional().isIn(['male', 'female', 'other']).withMessage('Invalid gender'),
  body('contactNumber').optional().isMobilePhone().withMessage('Valid contact number is required')
];

const validateLogin = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required')
];

const validateUpdateDetails = [
  body('fullName').optional().trim().isLength({ min: 2, max: 100 }).withMessage('Full name must be between 2 and 100 characters'),
  body('contactNumber').optional().isMobilePhone().withMessage('Valid contact number is required'),
  body('currentAddress.street').optional().trim().notEmpty().withMessage('Street address is required'),
  body('currentAddress.city').optional().trim().notEmpty().withMessage('City is required'),
  body('currentAddress.state').optional().trim().notEmpty().withMessage('State is required'),
  body('currentAddress.pincode').optional().trim().notEmpty().withMessage('Pincode is required'),
  body('permanentAddress.street').optional().trim().notEmpty().withMessage('Street address is required'),
  body('permanentAddress.city').optional().trim().notEmpty().withMessage('City is required'),
  body('permanentAddress.state').optional().trim().notEmpty().withMessage('State is required'),
  body('permanentAddress.pincode').optional().trim().notEmpty().withMessage('Pincode is required')
];

const validateUpdatePassword = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters long')
];

const validateForgotPassword = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email')
];

const validateResetPassword = [
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

// Public routes
router.post('/login', validateLogin, authController.loginUser);
router.post('/forgotpassword', validateForgotPassword, authController.forgotPassword);
router.put('/resetpassword/:resettoken', validateResetPassword, authController.resetPassword);
router.get('/verifyemail/:token', authController.verifyEmail);

// Protected routes
router.use(verifyToken); // Apply authentication to all routes below

router.post('/logout', authController.logoutUser);
router.get('/me', authController.getMe);
router.put('/updatedetails', validateUpdateDetails, authController.updateDetails);
router.put('/updatepassword', validateUpdatePassword, authController.updatePassword);
router.post('/resendverification', authController.resendEmailVerification);

// Admin only routes
router.get('/users', isAdmin, authController.getAllUsers);
router.get('/user/:id', isAdmin, authController.getUserById);

// Super admin only routes
router.post('/register', isSuperAdmin, validateRegistration, authController.registerUser);

module.exports = router;
