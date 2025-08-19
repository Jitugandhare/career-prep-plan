const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin, canAccessEmployee } = require('../middleware/auth.js');

// Placeholder for leave controller
const leaveController = {
  // This will be implemented later
  requestLeave: (req, res) => res.json({ message: 'Request leave endpoint' }),
  getLeaveRequests: (req, res) => res.json({ message: 'Get leave requests endpoint' }),
  approveLeave: (req, res) => res.json({ message: 'Approve leave endpoint' }),
  getLeaveBalance: (req, res) => res.json({ message: 'Leave balance endpoint' }),
  cancelLeave: (req, res) => res.json({ message: 'Cancel leave endpoint' })
};

// Employee leave routes
router.post('/request', verifyToken, leaveController.requestLeave);
router.get('/my-requests', verifyToken, leaveController.getLeaveRequests);
router.get('/balance', verifyToken, leaveController.getLeaveBalance);
router.put('/:id/cancel', verifyToken, leaveController.cancelLeave);

// Admin/Manager routes
router.get('/requests', verifyToken, isAdmin, leaveController.getLeaveRequests);
router.put('/:id/approve', verifyToken, isAdmin, leaveController.approveLeave);
router.get('/:employeeId/balance', verifyToken, isAdmin, canAccessEmployee, leaveController.getLeaveBalance);

module.exports = router;
