// controllers/providerController.js
const Booking = require('../models/RequestModel');
const jwt = require('jsonwebtoken');

// Get assigned requests for the provider
exports.getAssignedRequests = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify token and get provider id
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        const providerId = decoded.user.id;

        // Fetch assigned requests
        const requests = await Booking.find({providerId: providerId });
        console.log(requests);
        res.status(200).json({ requests });
    } catch (err) {
        console.error('Error fetching assigned requests:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Accept a request
exports.acceptRequest = async (req, res) => {
    const { requestId } = req.params;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify token and get provider id
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const providerId = decoded.user.id;

        // Find and update the booking request
        const booking = await Booking.findByIdAndUpdate(
            requestId,
            { status: 'accepted', provider: providerId },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({ message: 'Request accepted', booking });
    } catch (err) {
        console.error('Error accepting request:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Decline a request
exports.declineRequest = async (req, res) => {
    const { requestId } = req.params;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify token and get provider id
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const providerId = decoded.user.id;

        // Find and update the booking request to declined
        const booking = await Booking.findByIdAndUpdate(
            requestId,
            { status: 'declined' },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({ message: 'Request declined', booking });
    } catch (err) {
        console.error('Error declining request:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};

// Complete a request
exports.completeRequest = async (req, res) => {
    const { requestId } = req.params;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify token and get provider id
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const providerId = decoded.user.id;

        // Find and update the booking request to completed
        const booking = await Booking.findByIdAndUpdate(
            requestId,
            { status: 'completed' },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json({ message: 'Request marked as completed', booking });
    } catch (err) {
        console.error('Error completing request:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};
