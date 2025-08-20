const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();


// Import routes
const adminRoutes = require('./routes/admin.routes.js');
const employeeRoutes = require('./routes/employee.routes.js');
const companyRoutes = require('./routes/company.routes.js');
const attendanceRoutes = require('./routes/attendance.routes.js');
const leaveRoutes = require('./routes/leave.routes.js');
const payrollRoutes = require('./routes/payroll.routes.js');
const trainingRoutes = require('./routes/training.routes.js');
const hiringRoutes = require('./routes/hiring.routes.js');
const authRoutes = require('./routes/auth.routes.js'); 

// Import middleware
const { errorHandler } = require('./middleware/errorHandler.js');
const authMiddleware = require('./middleware/auth.js');

const app = express();
// Security middleware
app.use(helmet());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// CORS configuration
app.use(cors());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use('/uploads', express.static('uploads'));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'HRMS Backend is running',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', authMiddleware.verifyToken, authMiddleware.isAdmin, adminRoutes);
app.use('/api/employee', authMiddleware.verifyToken, employeeRoutes);
app.use('/api/company', authMiddleware.verifyToken, companyRoutes);
app.use('/api/attendance', authMiddleware.verifyToken, attendanceRoutes);
app.use('/api/leave', authMiddleware.verifyToken, leaveRoutes);
app.use('/api/payroll', authMiddleware.verifyToken, payrollRoutes);
app.use('/api/training', authMiddleware.verifyToken, trainingRoutes);
app.use('/api/hiring', authMiddleware.verifyToken, hiringRoutes);

// Error handler
app.use(errorHandler);



// DB connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hrms');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Start server
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`✅ HRMS Backend server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
};

startServer();

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

module.exports = app;
