const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

// Verify JWT token
const verifyToken = async (req, res, next) => {
  try {
    let token;
    
    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Check for token in cookies
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Token is not valid. User not found.'
      });
    }
    
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'User account is deactivated.'
      });
    }
    
    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token.'
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired.'
      });
    }
    
    return res.status(500).json({
      success: false,
      message: 'Token verification failed.',
      error: error.message
    });
  }
};

// Check if user is admin or super admin
const isAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated.'
      });
    }
    
    if (!['admin', 'super_admin'].includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }
    
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Admin verification failed.',
      error: error.message
    });
  }
};

// Check if user is super admin
const isSuperAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated.'
      });
    }
    
    if (req.user.role !== 'super_admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Super admin privileges required.'
      });
    }
    
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Super admin verification failed.',
      error: error.message
    });
  }
};

// Check if user is manager or above
const isManager = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated.'
      });
    }
    
    if (!['manager', 'admin', 'super_admin'].includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Manager privileges required.'
      });
    }
    
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Manager verification failed.',
      error: error.message
    });
  }
};

// Check if user can access specific employee data
const canAccessEmployee = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated.'
      });
    }
    
    const employeeId = req.params.employeeId || req.body.employeeId;
    
    // Super admin and admin can access all employee data
    if (['super_admin', 'admin'].includes(req.user.role)) {
      return next();
    }
    
    // Manager can access employees in their department
    if (req.user.role === 'manager') {
      // This would need to be implemented based on department structure
      // For now, allowing access
      return next();
    }
    
    // Employee can only access their own data
    if (req.user.role === 'employee') {
      if (req.user._id.toString() === employeeId) {
        return next();
      }
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only access your own data.'
      });
    }
    
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Employee access verification failed.',
      error: error.message
    });
  }
};

// Check if user can access specific department data
const canAccessDepartment = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated.'
      });
    }
    
    const departmentId = req.params.departmentId || req.body.departmentId;
    
    // Super admin and admin can access all department data
    if (['super_admin', 'admin'].includes(req.user.role)) {
      return next();
    }
    
    // Manager can only access their own department
    if (req.user.role === 'manager') {
      if (req.user.department.toString() === departmentId) {
        return next();
      }
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only access your own department data.'
      });
    }
    
    // Employee cannot access department data
    if (req.user.role === 'employee') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Employees cannot access department data.'
      });
    }
    
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Department access verification failed.',
      error: error.message
    });
  }
};

// Optional authentication (for public routes that can work with or without auth)
const optionalAuth = async (req, res, next) => {
  try {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        if (user && user.isActive) {
          req.user = user;
        }
      } catch (error) {
        // Token is invalid, but we continue without authentication
      }
    }
    
    next();
  } catch (error) {
    next();
  }
};

module.exports = {
  verifyToken,
  isAdmin,
  isSuperAdmin,
  isManager,
  canAccessEmployee,
  canAccessDepartment,
  optionalAuth
};
