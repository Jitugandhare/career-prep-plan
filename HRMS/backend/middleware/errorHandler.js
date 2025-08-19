// Error handling middleware
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error for debugging
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    user: req.user ? req.user.employeeId : 'unauthenticated',
    timestamp: new Date().toISOString()
  });

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = {
      message,
      statusCode: 404
    };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    const message = `Duplicate field value: ${field} - ${value}. Please use another value.`;
    error = {
      message,
      statusCode: 400
    };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = {
      message,
      statusCode: 400
    };
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error = {
      message,
      statusCode: 401
    };
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    error = {
      message,
      statusCode: 401
    };
  }

  // Multer errors (file upload)
  if (err.code === 'LIMIT_FILE_SIZE') {
    const message = 'File too large';
    error = {
      message,
      statusCode: 400
    };
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    const message = 'Unexpected file field';
    error = {
      message,
      statusCode: 400
    };
  }

  // Rate limiting errors
  if (err.status === 429) {
    const message = 'Too many requests, please try again later';
    error = {
      message,
      statusCode: 429
    };
  }

  // Default error
  const statusCode = error.statusCode || err.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  // Don't send error details in production
  const errorResponse = {
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && {
      error: err.message,
      stack: err.stack
    })
  };

  res.status(statusCode).json(errorResponse);
};

// Async error handler wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Not found middleware
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Validation error formatter
const formatValidationErrors = (errors) => {
  const formattedErrors = {};
  
  Object.keys(errors).forEach(key => {
    formattedErrors[key] = errors[key].message;
  });
  
  return formattedErrors;
};

// Custom error class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Error types
const ErrorTypes = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR: 'AUTHORIZATION_ERROR',
  NOT_FOUND_ERROR: 'NOT_FOUND_ERROR',
  DUPLICATE_ERROR: 'DUPLICATE_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  RATE_LIMIT_ERROR: 'RATE_LIMIT_ERROR',
  FILE_UPLOAD_ERROR: 'FILE_UPLOAD_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR: 'EXTERNAL_SERVICE_ERROR'
};

// Create specific error types
const createError = (type, message, statusCode = 500) => {
  const error = new AppError(message, statusCode);
  error.type = type;
  return error;
};

// Validation error
const createValidationError = (message = 'Validation failed') => {
  return createError(ErrorTypes.VALIDATION_ERROR, message, 400);
};

// Authentication error
const createAuthError = (message = 'Authentication failed') => {
  return createError(ErrorTypes.AUTHENTICATION_ERROR, message, 401);
};

// Authorization error
const createAuthzError = (message = 'Access denied') => {
  return createError(ErrorTypes.AUTHORIZATION_ERROR, message, 403);
};

// Not found error
const createNotFoundError = (message = 'Resource not found') => {
  return createError(ErrorTypes.NOT_FOUND_ERROR, message, 404);
};

// Duplicate error
const createDuplicateError = (message = 'Duplicate resource') => {
  return createError(ErrorTypes.DUPLICATE_ERROR, message, 409);
};

// Rate limit error
const createRateLimitError = (message = 'Too many requests') => {
  return createError(ErrorTypes.RATE_LIMIT_ERROR, message, 429);
};

// File upload error
const createFileUploadError = (message = 'File upload failed') => {
  return createError(ErrorTypes.FILE_UPLOAD_ERROR, message, 400);
};

// Database error
const createDatabaseError = (message = 'Database operation failed') => {
  return createError(ErrorTypes.DATABASE_ERROR, message, 500);
};

// External service error
const createExternalServiceError = (message = 'External service error') => {
  return createError(ErrorTypes.EXTERNAL_SERVICE_ERROR, message, 502);
};

module.exports = {
  errorHandler,
  asyncHandler,
  notFound,
  formatValidationErrors,
  AppError,
  ErrorTypes,
  createError,
  createValidationError,
  createAuthError,
  createAuthzError,
  createNotFoundError,
  createDuplicateError,
  createRateLimitError,
  createFileUploadError,
  createDatabaseError,
  createExternalServiceError
};
