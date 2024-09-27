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
        // Verify token and get provider id
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const providerId = decoded.user.id; // Directly use providerId from the token

        // Debug: Log the decoded token and providerId
        console.log('Decoded token:', decoded);
        console.log('Provider ID:', providerId);

        // Fetch assigned requests where status is 'Pending'
        const requests = await Booking.find({ providerId: providerId, status: 'Pending' })
            .populate('serviceId', 'name description category price location image')  // Populate service details
            .populate('userId', 'name phone email location gender');                  // Populate user details

        // Debug: Log the found requests
        console.log('Found requests:', requests);

        if (requests.length === 0) {
            return res.status(404).json({ message: 'No pending requests found for this provider' });
        }

        res.status(200).json({ requests });
    } catch (err) {
        console.error('Error fetching assigned requests:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get assigned requests for the provider
exports.getAcceptedRequests = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify token and get provider id
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const providerId = decoded.user.id; // Directly use providerId from the token

        // Debug: Log the decoded token and providerId
        console.log('Decoded token:', decoded);
        console.log('Provider ID:', providerId);

        // Fetch assigned requests where status is 'Pending'
        const requests = await Booking.find({ providerId: providerId, status: 'Accepted' })
            .populate('serviceId', 'name description category price location image')  // Populate service details
            .populate('userId', 'name phone email location gender');                  // Populate user details

        // Debug: Log the found requests
        console.log('Found requests:', requests);

        if (requests.length === 0) {
            return res.status(404).json({ message: 'No pending requests found for this provider' });
        }

        res.status(200).json({ requests });
    } catch (err) {
        console.error('Error fetching assigned requests:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get assigned requests for the provider
exports.getCompletedRequests = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify token and get provider id
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const providerId = decoded.user.id; // Directly use providerId from the token

        // Debug: Log the decoded token and providerId
        console.log('Decoded token:', decoded);
        console.log('Provider ID:', providerId);

        // Fetch assigned requests where status is 'Pending'
        const requests = await Booking.find({ providerId: providerId, status: 'Completed' })
            .populate('serviceId', 'name description category price location image')  // Populate service details
            .populate('userId', 'name phone email location gender');                  // Populate user details

        // Debug: Log the found requests
        console.log('Found requests:', requests);

        if (requests.length === 0) {
            return res.status(404).json({ message: 'No pending requests found for this provider' });
        }

        res.status(200).json({ requests });
    } catch (err) {
        console.error('Error fetching assigned requests:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


// Accept a request
// Get accepted requests for the provider (only requests with status 'accepted')
exports.acceptRequest = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify token and get provider id
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const providerId = decoded.user.id; 

        // Fetch accepted requests where status is 'accepted'
        const requests = await Booking.find({ providerId: providerId, status: 'accepted' })
            .populate('serviceId', 'name description category price location image')  // Populate service details
            .populate('userId', 'name phone email location gender');                  // Populate user details

        if (requests.length === 0) {
            return res.status(404).json({ message: 'No accepted requests found for this provider' });
        }

        res.status(200).json({ requests });
    } catch (err) {
        console.error('Error fetching accepted requests:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
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
// Get completed requests for the provider
exports.completeRequest = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify token and get provider id
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const providerId = decoded.user.id;

        // Fetch completed requests where status is 'completed'
        const requests = await Booking.find({ providerId: providerId, status: 'completed' })
            .populate('serviceId', 'name description category price location image')  // Populate service details
            .populate('userId', 'name phone email location gender');                  // Populate user details

        if (requests.length === 0) {
            return res.status(404).json({ message: 'No completed requests found for this provider' });
        }

        res.status(200).json({ requests });
    } catch (err) {
        console.error('Error fetching completed requests:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
