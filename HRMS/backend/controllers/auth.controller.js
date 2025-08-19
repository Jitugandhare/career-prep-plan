const User = require('../models/User.js');
const { asyncHandler, createAuthError, createValidationError, createNotFoundError } = require('../middleware/errorHandler.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  });
};

// Set token cookie
const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);
  
  const options = {
    expires: new Date(Date.now() + (process.env.JWT_COOKIE_EXPIRE || 30) * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  };

  res.status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user: user.getPublicProfile()
    });
};

// @desc    Register user (Super Admin only)
// @route   POST /api/auth/register
// @access  Private (Super Admin)
const registerUser = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    password,
    role,
    department,
    section,
    designation,
    dateOfJoining,
    employeeCategory,
    dateOfBirth,
    gender,
    contactNumber,
    currentAddress,
    permanentAddress
  } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw createValidationError('User with this email already exists');
  }

  // Generate employee ID
  const departmentCode = department.toString().slice(-1);
  const sectionCode = section ? section.toString().slice(-1) : 'a';
  const postCode = '35'; // Default post code, can be made dynamic
  
  const employeeId = await User.generateEmployeeId(departmentCode, sectionCode, postCode);

  // Create user
  const user = await User.create({
    employeeId,
    fullName,
    email,
    password,
    role: role || 'employee',
    department,
    section,
    designation,
    dateOfJoining,
    employeeCategory,
    dateOfBirth,
    gender,
    contactNumber,
    currentAddress,
    permanentAddress
  });

  sendTokenResponse(user, 201, res);
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    throw createValidationError('Please provide an email and password');
  }

  // Check for user
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw createAuthError('Invalid credentials');
  }

  // Check if user is active
  if (!user.isActive) {
    throw createAuthError('Your account has been deactivated. Please contact HR.');
  }

  // Check if password matches
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw createAuthError('Invalid credentials');
  }

  // Update last login
  user.lastLogin = new Date();
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: 'User logged out successfully'
  });
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)
    .populate('department', 'name code')
    .populate('section', 'name code');

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update user details
// @route   PUT /api/auth/updatedetails
// @access  Private
const updateDetails = asyncHandler(async (req, res) => {
  const fieldsToUpdate = {
    fullName: req.body.fullName,
    contactNumber: req.body.contactNumber,
    currentAddress: req.body.currentAddress,
    permanentAddress: req.body.permanentAddress,
    emergencyContact: req.body.emergencyContact
  };

  // Remove undefined fields
  Object.keys(fieldsToUpdate).forEach(key => 
    fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
  );

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update password
// @route   PUT /api/auth/updatepassword
// @access  Private
const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw createValidationError('Please provide current and new password');
  }

  const user = await User.findById(req.user.id).select('+password');

  // Check current password
  if (!(await user.comparePassword(currentPassword))) {
    throw createAuthError('Password is incorrect');
  }

  user.password = newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc    Forgot password
// @route   POST /api/auth/forgotpassword
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw createValidationError('Please provide an email address');
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw createNotFoundError('User not found with that email');
  }

  // Generate reset token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  user.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  await user.save();

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/resetpassword/${resetToken}`;

  // TODO: Send email with reset link
  // For now, just return the token in development
  if (process.env.NODE_ENV === 'development') {
    res.status(200).json({
      success: true,
      message: 'Password reset email sent',
      resetToken: process.env.NODE_ENV === 'development' ? resetToken : undefined
    });
  } else {
    res.status(200).json({
      success: true,
      message: 'Password reset email sent'
    });
  }
});

// @desc    Reset password
// @route   PUT /api/auth/resetpassword/:resettoken
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: resetPasswordToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  if (!user) {
    throw createValidationError('Invalid token or token expired');
  }

  // Set new password
  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc    Verify email
// @route   GET /api/auth/verifyemail/:token
// @access  Public
const verifyEmail = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    emailVerificationToken: req.params.token,
    emailVerificationExpires: { $gt: Date.now() }
  });

  if (!user) {
    throw createValidationError('Invalid verification token or token expired');
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Email verified successfully'
  });
});

// @desc    Resend email verification
// @route   POST /api/auth/resendverification
// @access  Private
const resendEmailVerification = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user.isEmailVerified) {
    throw createValidationError('Email is already verified');
  }

  // Generate verification token
  const verificationToken = crypto.randomBytes(20).toString('hex');

  user.emailVerificationToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');

  user.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

  await user.save();

  // TODO: Send verification email
  res.status(200).json({
    success: true,
    message: 'Verification email sent'
  });
});

// @desc    Get user profile by ID (Admin/Manager only)
// @route   GET /api/auth/user/:id
// @access  Private (Admin/Manager)
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .populate('department', 'name code')
    .populate('section', 'name code')
    .select('-password');

  if (!user) {
    throw createNotFoundError('User not found');
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Get all users (Admin only)
// @route   GET /api/auth/users
// @access  Private (Admin)
const getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, search, department, role, status } = req.query;

  // Build query
  const query = { isActive: true };
  
  if (search) {
    query.$or = [
      { fullName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { employeeId: { $regex: search, $options: 'i' } }
    ];
  }
  
  if (department) query.department = department;
  if (role) query.role = role;
  if (status) query.employeeStatus = status;

  const users = await User.find(query)
    .populate('department', 'name code')
    .populate('section', 'name code')
    .select('-password')
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const total = await User.countDocuments(query);

  res.status(200).json({
    success: true,
    data: users,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      itemsPerPage: limit
    }
  });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  updateDetails,
  updatePassword,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendEmailVerification,
  getUserById,
  getAllUsers
};
