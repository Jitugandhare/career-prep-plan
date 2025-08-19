const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const companyController = require('../controllers/company.controller.js');
const { verifyToken, isAdmin } = require('../middleware/auth.js');

// Validation middleware
const validateCompanyProfile = [
  body('name').trim().notEmpty().withMessage('Company name is required'),
  body('type').optional().isIn(['main_office', 'branch']).withMessage('Invalid company type'),
  body('registrationNumber').optional().trim().notEmpty().withMessage('Registration number is required if provided'),
  body('gstNumber').optional().trim().notEmpty().withMessage('GST number is required if provided'),
  body('address.street').optional().trim().notEmpty().withMessage('Street address is required if address is provided'),
  body('address.city').optional().trim().notEmpty().withMessage('City is required if address is provided'),
  body('address.state').optional().trim().notEmpty().withMessage('State is required if address is provided'),
  body('address.pincode').optional().trim().notEmpty().withMessage('Pincode is required if address is provided'),
  body('contactInfo.phone').optional().isMobilePhone().withMessage('Valid phone number is required if provided'),
  body('contactInfo.email').optional().isEmail().withMessage('Valid email is required if provided'),
  body('foundedYear').optional().isInt({ min: 1900, max: new Date().getFullYear() }).withMessage('Valid founded year is required if provided'),
  body('employeeCount').optional().isInt({ min: 1 }).withMessage('Employee count must be a positive integer if provided')
];

const validateDepartment = [
  body('name').trim().notEmpty().withMessage('Department name is required'),
  body('code').trim().notEmpty().withMessage('Department code is required'),
  body('description').optional().trim().notEmpty().withMessage('Description is required if provided'),
  body('head').optional().isMongoId().withMessage('Valid user ID is required for department head if provided')
];

const validateSection = [
  body('name').trim().notEmpty().withMessage('Section name is required'),
  body('code').trim().notEmpty().withMessage('Section code is required'),
  body('department').isMongoId().withMessage('Valid department ID is required'),
  body('description').optional().trim().notEmpty().withMessage('Description is required if provided'),
  body('head').optional().isMongoId().withMessage('Valid user ID is required for section head if provided')
];

const validateShiftCategory = [
  body('name').trim().notEmpty().withMessage('Shift name is required'),
  body('type').isIn(['fixed', 'rotational', 'flexible']).withMessage('Valid shift type is required'),
  body('description').optional().trim().notEmpty().withMessage('Description is required if provided'),
  body('workingHours.start').optional().matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Valid start time format (HH:MM) is required if provided'),
  body('workingHours.end').optional().matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Valid end time format (HH:MM) is required if provided'),
  body('workingHours.duration').optional().isFloat({ min: 0 }).withMessage('Valid duration is required if provided'),
  body('weeklyOffs').optional().isArray().withMessage('Weekly offs must be an array if provided'),
  body('weeklyOffs.*').optional().isIn(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']).withMessage('Valid day names are required for weekly offs'),
  body('gracePeriod').optional().isInt({ min: 0 }).withMessage('Grace period must be a non-negative integer if provided')
];

const validateHoliday = [
  body('name').trim().notEmpty().withMessage('Holiday name is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('type').optional().isIn(['national', 'company', 'optional']).withMessage('Valid holiday type is required if provided'),
  body('description').optional().trim().notEmpty().withMessage('Description is required if provided')
];

const validateCompanyEvent = [
  body('title').trim().notEmpty().withMessage('Event title is required'),
  body('description').optional().trim().notEmpty().withMessage('Description is required if provided'),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('endDate').optional().isISO8601().withMessage('Valid end date is required if provided'),
  body('type').optional().isIn(['meeting', 'training', 'celebration', 'other']).withMessage('Valid event type is required if provided'),
  body('attendees').optional().isArray().withMessage('Attendees must be an array if provided'),
  body('attendees.*').optional().isMongoId().withMessage('Valid user IDs are required for attendees if provided'),
  body('location').optional().trim().notEmpty().withMessage('Location is required if provided')
];

// Company Profile routes
router.get('/profile', companyController.getCompanyProfile);
router.put('/profile', isAdmin, validateCompanyProfile, companyController.updateCompanyProfile);

// Department routes
router.get('/departments', companyController.getAllDepartments);
router.get('/departments/:id', companyController.getDepartmentById);
router.post('/departments', isAdmin, validateDepartment, companyController.createDepartment);
router.put('/departments/:id', isAdmin, validateDepartment, companyController.updateDepartment);
router.delete('/departments/:id', isAdmin, companyController.deleteDepartment);

// Section routes
router.get('/sections', companyController.getAllSections);
router.post('/sections', isAdmin, validateSection, companyController.createSection);

// Shift Category routes
router.get('/shifts', companyController.getAllShiftCategories);
router.post('/shifts', isAdmin, validateShiftCategory, companyController.createShiftCategory);

// Holiday routes
router.get('/holidays', companyController.getAllHolidays);
router.post('/holidays', isAdmin, validateHoliday, companyController.createHoliday);

// Company Event routes
router.get('/events', companyController.getAllCompanyEvents);
router.post('/events', isAdmin, validateCompanyEvent, companyController.createCompanyEvent);

// Organizational Structure route
router.get('/structure', companyController.getOrganizationalStructure);

module.exports = router;
