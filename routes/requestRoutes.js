// routes/providerRoutes.js
const express = require('express');
const {
    getAssignedRequests,
    getAcceptedRequests,
    getCompletedRequests,
    acceptRequest,
    declineRequest,
    completeRequest,
    deleteCompletedRequest
} = require('../controllers/providerRequest');

const router = express.Router();

// View assigned requests
router.get('/assigned-requests', getAssignedRequests);
router.get('/accepted-requests', getAcceptedRequests);
router.get('/completed-requests', getCompletedRequests);

// Accept a request
router.put('/accept/:requestId', acceptRequest);

// Decline a request`11`````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````
router.put('/decline/:requestId', declineRequest);

// Complete a request
router.put('/complete/:requestId', completeRequest);
router.delete('/delete/:requestId', deleteCompletedRequest);

module.exports = router;
