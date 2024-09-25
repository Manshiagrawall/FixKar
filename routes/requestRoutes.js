// routes/requestRoutes.js
const express = require('express');
const router = express.Router();
const requestController = require('../controllers/serviceRequestController');

// Create a service request
router.post('/', requestController.createRequest);

// Get all requests assigned to a provider
router.get('/assigned', requestController.getAssignedRequests);

// Accept a service request
router.put('/:id/accept', requestController.acceptRequest);

// Complete a service request
router.put('/:id/complete', requestController.completeRequest);

// Decline a service request
router.delete('/:id/decline', requestController.declineRequest);

module.exports = router;
