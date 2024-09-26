// routes/providerRoutes.js
const express = require('express');
const {
    getAssignedRequests,
    acceptRequest,
    declineRequest,
    completeRequest
} = require('../controllers/providerRequest');

const router = express.Router();

// View assigned requests
router.get('/assigned-requests', getAssignedRequests);

// Accept a request
router.post('/accept/:requestId', acceptRequest);

// Decline a request
router.post('/decline/:requestId', declineRequest);

// Complete a request
router.post('/complete/:requestId', completeRequest);

module.exports = router;
