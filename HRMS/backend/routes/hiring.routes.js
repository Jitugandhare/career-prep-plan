const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth.js');

// Placeholder for hiring controller
const hiringController = {
  // This will be implemented later
  createManpowerRequest: (req, res) => res.json({ message: 'Create manpower request endpoint' }),
  getManpowerRequests: (req, res) => res.json({ message: 'Get manpower requests endpoint' }),
  approveManpowerRequest: (req, res) => res.json({ message: 'Approve manpower request endpoint' }),
  createJobDescription: (req, res) => res.json({ message: 'Create job description endpoint' }),
  getApplicants: (req, res) => res.json({ message: 'Get applicants endpoint' }),
  scheduleInterview: (req, res) => res.json({ message: 'Schedule interview endpoint' }),
  getHiringReport: (req, res) => res.json({ message: 'Hiring report endpoint' })
};

// Manager routes
router.post('/manpower-request', verifyToken, hiringController.createManpowerRequest);
router.get('/my-requests', verifyToken, hiringController.getManpowerRequests);

// Admin/HR routes
router.get('/manpower-requests', verifyToken, isAdmin, hiringController.getManpowerRequests);
router.put('/manpower-request/:id/approve', verifyToken, isAdmin, hiringController.approveManpowerRequest);
router.post('/job-description', verifyToken, isAdmin, hiringController.createJobDescription);
router.get('/applicants', verifyToken, isAdmin, hiringController.getApplicants);
router.post('/interview/schedule', verifyToken, isAdmin, hiringController.scheduleInterview);
router.get('/report', verifyToken, isAdmin, hiringController.getHiringReport);

module.exports = router;
