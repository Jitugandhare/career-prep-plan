const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin, canAccessEmployee } = require('../middleware/auth.js');

// Placeholder for employee controller
const employeeController = {
  // This will be implemented later
  getEmployeeProfile: (req, res) => res.json({ message: 'Employee profile endpoint' }),
  updateEmployeeProfile: (req, res) => res.json({ message: 'Update employee profile endpoint' }),
  getEmployeeDocuments: (req, res) => res.json({ message: 'Employee documents endpoint' }),
  uploadEmployeeDocument: (req, res) => res.json({ message: 'Upload document endpoint' })
};

// Employee profile routes
router.get('/profile', verifyToken, employeeController.getEmployeeProfile);
router.put('/profile', verifyToken, employeeController.updateEmployeeProfile);

// Employee documents routes
router.get('/documents', verifyToken, employeeController.getEmployeeDocuments);
router.post('/documents/upload', verifyToken, employeeController.uploadEmployeeDocument);

// Admin only routes
router.get('/:id/profile', verifyToken, isAdmin, canAccessEmployee, employeeController.getEmployeeProfile);
router.put('/:id/profile', verifyToken, isAdmin, canAccessEmployee, employeeController.updateEmployeeProfile);

module.exports = router;
