# HRMS Backend - MERN Stack Implementation

## Overview

This is the backend implementation of the HR Management System (HRMS) built with Node.js, Express.js, and MongoDB using the MVC (Model-View-Controller) architecture pattern.

## Features Implemented

### ✅ Core Backend Infrastructure
- **Express.js Server** with comprehensive middleware setup
- **MongoDB Integration** with Mongoose ODM
- **JWT Authentication** with role-based access control
- **Input Validation** using express-validator
- **Error Handling** with custom error classes
- **Security Middleware** (helmet, CORS, rate limiting)
- **File Upload** support with Multer
- **Environment Configuration** management

### ✅ Database Models
- **User Model** - Complete employee management with authentication
- **Company Model** - Organizational structure management
- **Attendance Model** - Time tracking and attendance management
- **Leave Model** - Leave types, requests, and balance management
- **Payroll Model** - Salary structure and statutory compliance

### ✅ API Endpoints
- **Authentication Routes** - Login, registration, password management
- **Company Routes** - Department, section, shift management
- **Employee Routes** - Profile management and document handling
- **Attendance Routes** - Clock in/out and reporting
- **Leave Routes** - Leave requests and approval workflow
- **Payroll Routes** - Salary management and reports
- **Training Routes** - Training program management
- **Hiring Routes** - Recruitment and hiring process
- **Admin Routes** - Administrative functions and reporting

### ✅ Security Features
- **JWT Token Authentication**
- **Role-based Access Control** (Super Admin, Admin, Manager, Employee)
- **Password Hashing** with bcrypt
- **Input Sanitization** and validation
- **Rate Limiting** to prevent abuse
- **CORS Configuration** for frontend integration

## Project Structure

```
HRMS/
├── models/                 # Database models
│   ├── User.js            # User/Employee model
│   ├── Company.js         # Company and organizational models
│   ├── Attendance.js      # Attendance tracking model
│   ├── Leave.js           # Leave management model
│   └── Payroll.js         # Salary and payroll model
├── controllers/            # Business logic controllers
│   ├── auth.controller.js # Authentication controller
│   └── company.controller.js # Company management controller
├── routes/                 # API route definitions
│   ├── auth.routes.js     # Authentication routes
│   ├── company.routes.js  # Company management routes
│   ├── employee.routes.js # Employee management routes
│   ├── attendance.routes.js # Attendance routes
│   ├── leave.routes.js    # Leave management routes
│   ├── payroll.routes.js  # Payroll routes
│   ├── training.routes.js # Training routes
│   ├── hiring.routes.js   # Hiring process routes
│   └── admin.routes.js    # Admin functions routes
├── middleware/             # Custom middleware
│   ├── auth.js            # Authentication middleware
│   └── errorHandler.js    # Error handling middleware
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
└── env.example            # Environment variables template
```

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone <repository-url>
cd HRMS
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Copy the environment template and configure your variables:
```bash
cp env.example .env
```

Edit `.env` file with your configuration:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/hrms

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=30d

# Email Configuration (for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads
```

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# Start MongoDB service
sudo systemctl start mongod

# Or start MongoDB daemon
mongod
```

### 5. Run the Application
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start

# Run tests
npm test
```

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### POST /api/auth/login
User login with email and password
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### POST /api/auth/register
Register new user (Super Admin only)
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "employee",
  "department": "department_id",
  "designation": "Software Engineer",
  "dateOfJoining": "2024-01-15"
}
```

#### GET /api/auth/me
Get current user profile (requires authentication)

#### PUT /api/auth/updatedetails
Update user profile details (requires authentication)

### Company Management Endpoints

#### GET /api/company/profile
Get company profile information

#### PUT /api/company/profile
Update company profile (Admin only)

#### GET /api/company/departments
Get all departments with pagination

#### POST /api/company/departments
Create new department (Admin only)

#### GET /api/company/structure
Get complete organizational structure

### Employee Management Endpoints

#### GET /api/employee/profile
Get employee profile (own profile)

#### PUT /api/employee/profile
Update employee profile

#### GET /api/employee/:id/profile
Get specific employee profile (Admin/Manager only)

### Attendance Endpoints

#### POST /api/attendance/clockin
Clock in for the day

#### POST /api/attendance/clockout
Clock out for the day

#### GET /api/attendance/my-attendance
Get own attendance records

#### GET /api/attendance/report
Get attendance report (Admin only)

### Leave Management Endpoints

#### POST /api/leave/request
Request leave

#### GET /api/leave/my-requests
Get own leave requests

#### GET /api/leave/requests
Get all leave requests (Admin/Manager only)

#### PUT /api/leave/:id/approve
Approve/reject leave request (Admin/Manager only)

### Payroll Endpoints

#### GET /api/payroll/salary-structure
Get salary structure

#### GET /api/payroll/salary-slip/:month/:year
Get salary slip for specific month/year

#### POST /api/payroll/generate-salary
Generate salary slip (Admin only)

## Database Schema

### User Model
- **Basic Info**: employeeId, fullName, email, password
- **Role & Access**: role, isActive, department, section, designation
- **Employee Details**: dateOfJoining, employeeStatus, employeeCategory
- **Personal Info**: dateOfBirth, gender, contactNumber, addresses
- **Documents**: panCard, aadharCard
- **Employment**: probationPeriod, noticePeriod

### Company Model
- **Company Profile**: name, type, registration details, address
- **Departments**: name, code, description, head
- **Sections**: name, code, department, description, head
- **Shift Categories**: type, working hours, weekly offs, grace period
- **Holidays**: name, date, type, description
- **Company Events**: title, description, dates, attendees

### Attendance Model
- **Clock In/Out**: time, location, GPS coordinates
- **Working Hours**: total hours, overtime, break time
- **Status**: present, absent, half-day, leave
- **Late Coming**: waiver requests, approval workflow
- **Manual Entry**: admin override capabilities

### Leave Model
- **Leave Types**: CL, SL, EL, etc. with policies
- **Leave Requests**: start/end dates, reason, approval workflow
- **Leave Balance**: total, used, remaining, carry forward
- **Approval Process**: manager and HR approval workflow

### Payroll Model
- **Salary Structure**: basic, HRA, allowances, variable components
- **Salary Slips**: monthly earnings, deductions, net pay
- **Statutory Compliance**: PF, ESIC, TDS calculations
- **PF/ESIC Nominees**: registration and contribution tracking

## Security Features

### Authentication
- JWT tokens with configurable expiration
- Password hashing using bcrypt
- Role-based access control
- Token refresh mechanism

### Authorization
- **Super Admin**: Full system access
- **Admin**: HR and administrative functions
- **Manager**: Team and department management
- **Employee**: Own data and basic functions

### Input Validation
- Request body validation using express-validator
- MongoDB injection prevention
- File upload security
- Rate limiting to prevent abuse

## Error Handling

The system implements comprehensive error handling:
- **Custom Error Classes** for different error types
- **Validation Errors** with detailed field messages
- **Database Errors** with user-friendly messages
- **Authentication Errors** with proper HTTP status codes
- **Development vs Production** error details

## Development Guidelines

### Code Style
- Use ES6+ features
- Follow async/await pattern
- Implement proper error handling
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

### Database Operations
- Use Mongoose middleware for data validation
- Implement proper indexing for performance
- Use transactions for critical operations
- Implement soft delete for data integrity

### API Design
- RESTful endpoint naming
- Consistent response format
- Proper HTTP status codes
- Pagination for large datasets
- Search and filtering capabilities

## Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- --grep "User Model"
```

### Test Structure
- Unit tests for models and utilities
- Integration tests for API endpoints
- Mock data for testing scenarios
- Database testing with test database

## Deployment

### Production Considerations
- Set `NODE_ENV=production`
- Use strong JWT secrets
- Configure proper CORS origins
- Set up SSL/TLS certificates
- Implement logging and monitoring
- Use PM2 or similar process manager

### Environment Variables
- Never commit `.env` files
- Use different configurations for different environments
- Validate required environment variables on startup
- Use secure secret management in production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## Roadmap

### Phase 2 (Next Implementation)
- Complete employee management controllers
- Implement attendance tracking logic
- Add leave approval workflows
- Implement payroll calculations
- Add document management system

### Phase 3 (Advanced Features)
- Email notification system
- SMS integration
- Advanced reporting and analytics
- Mobile app API endpoints
- Third-party integrations

### Phase 4 (Enterprise Features)
- Multi-tenant architecture
- Advanced security features
- Performance optimization
- Scalability improvements
- Advanced analytics dashboard
