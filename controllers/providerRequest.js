// controllers/providerController.js
const Booking = require('../models/RequestModel');
const User = require('../models/User');  
const jwt = require('jsonwebtoken');

// Get assigned requests for the provider
exports.getAssignedRequests = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const providerId = decoded.user.id;

        console.log('Provider ID from token:', providerId);

        const requests = await Booking.find({ providerId: providerId, status: 'Pending' })
            .populate('serviceId', 'name description category price location image')
            .populate('userId', 'name phone email location gender');

        console.log('Fetched requests:', requests);

        // Return 204 No Content if no requests found
        if (requests.length === 0) {
            return res.status(204).send(); // No content, successful request
        }

        res.status(200).json({ requests });
    } catch (err) {
        console.error('Error fetching assigned requests:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get accepted requests for the provider
exports.getAcceptedRequests = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const providerId = decoded.user.id;

        console.log('Decoded token:', decoded);
        console.log('Provider ID:', providerId);

        const requests = await Booking.find({ providerId: providerId, status: "accepted" })
            .populate('serviceId', 'name description category price location image')
            .populate('userId', 'name phone email location gender');

        console.log('Found requests:', requests);

        // Return 204 No Content if no requests found
        if (requests.length === 0) {
            return res.status(204).send(); // No content, successful request
        }

        res.status(200).json({ requests });
    } catch (err) {
        console.error('Error fetching accepted requests:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get completed requests for the provider
exports.getCompletedRequests = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const providerId = decoded.user.id;

        console.log('Decoded token:', decoded);
        console.log('Provider ID:', providerId);

        const requests = await Booking.find({ providerId: providerId, status: 'Completed' })
            .populate('serviceId', 'name description category price location image')
            .populate('userId', 'name phone email location gender');

        console.log('Found requests:', requests);

        // Return 204 No Content if no requests found
        if (requests.length === 0) {
            return res.status(204).send(); // No content, successful request
        }

        res.status(200).json({ requests });
    } catch (err) {
        console.error('Error fetching completed requests:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Accept a request
exports.acceptRequest = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const providerId = decoded.user.id; 

        console.log('Decoded token:', decoded);
        
        const request = await Booking.findOneAndUpdate(
            { _id: req.params.requestId, providerId: providerId, status: "Pending" },
            { status: "accepted" },
            { new: true }
        );

        console.log('Accepted request:', request);
        if (!request) {
            return res.status(204).send(); // No content, request not found
        }

        res.status(200).json({ message: 'Request accepted', request });
    } catch (err) {
        console.error('Error accepting request:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Decline a request
exports.declineRequest = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const providerId = decoded.user.id;

        const request = await Booking.findOneAndUpdate(
            { _id: req.params.requestId, providerId: providerId, status: "pending" },
            { status: "declined" },
            { new: true }
        );

        if (!request) {
            return res.status(204).send(); // No content, request not found
        }

        res.status(200).json({ message: 'Request declined', request });
    } catch (err) {
        console.error('Error declining request:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Complete a request
exports.completeRequest = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const providerId = decoded.user.id;

        const request = await Booking.findOneAndUpdate(
            { _id: req.params.requestId, providerId: providerId, status: "accepted" },
            { status: "completed" },
            { new: true }
        );

        if (!request) {
            return res.status(204).send(); // No content, request not found
        }

        res.status(200).json({ message: 'Request completed', request });
    } catch (err) {
        console.error('Error completing request:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
