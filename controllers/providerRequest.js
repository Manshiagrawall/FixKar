// // controllers/providerController.js
// const Booking = require('../models/RequestModel');
// const User = require('../models/User');  
// const jwt = require('jsonwebtoken');


// // Get assigned requests for the provider
// exports.getAssignedRequests = async (req, res) => {
//     // Extract token from the request headers
//     const token = req.headers.authorization?.split(' ')[1];

//     // Check if token is provided
//     if (!token) {
//         return res.status(401).json({ message: 'No token provided' });
//     }

//     try {
//         // Verify token and extract providerId
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const providerId = decoded.user.id;

//         // Debugging: Log the providerId from the token to ensure correctness
//         console.log('Provider ID from token:', providerId);

//         // Fetch assigned requests where status is 'Pending' and providerId matches
//         const requests = await Booking.find({ providerId: providerId, status: 'Pending' })
//             .populate('serviceId', 'name description category price location image')  // Populate service details
//             .populate('userId', 'name phone email location gender');                  // Populate user details

//         // Debugging: Log the fetched requests
//         console.log('Fetched requests:', requests);

//         // If no requests are found, respond with a 404
//         if (requests.length === 0) {
//             console.log(`No pending requests found for provider ID: ${providerId}`);
//             return res.status(404).json({ message: 'No pending requests found for this provider' });
//         }

//         // Return the found requests as response
//         res.status(200).json({ requests });
//     } catch (err) {
//         // Error handling: Log the error and return a 500 status
//         console.error('Error fetching assigned requests:', err.message);
//         res.status(500).json({ message: 'Server error', error: err.message });
//     }
// };

// // Get assigned requests for the provider
// exports.getAcceptedRequests = async (req, res) => {
//     const token = req.headers.authorization?.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({ message: 'No token provided' });
//     }

//     try {
//         // Verify token and get provider id
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const providerId = decoded.user.id; // Directly use providerId from the token

//         // Debug: Log the decoded token and providerId
//         console.log('Decoded token:', decoded);
//         console.log('Provider ID:', providerId);
//         // Fetch assigned requests where status is 'Pending'
//         const requests = await Booking.find({ providerId: providerId, status: "accepted" })
//             .populate('serviceId', 'name description category price location image')  // Populate service details
//             .populate('userId', 'name phone email location gender');                  // Populate user details

//         // Debug: Log the found requests
//         console.log('Found requests:', requests);

//         if (requests.length === 0) {
//             return res.status(404).json({ message: 'No accepted requests found for this provider' });
//         }

//         res.status(200).json({ requests });
//     } catch (err) {
//         console.error('Error fetching assigned requests:', err.message);
//         res.status(500).json({ message: 'Server error', error: err.message });
//     }
// };

// // Get assigned requests for the provider
// exports.getCompletedRequests = async (req, res) => {
//     const token = req.headers.authorization?.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({ message: 'No token provided' });
//     }

//     try {
//         // Verify token and get provider id
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const providerId = decoded.user.id; // Directly use providerId from the token

//         // Debug: Log the decoded token and providerId
//         console.log('Decoded token:', decoded);
//         console.log('Provider ID:', providerId);

//         // Fetch assigned requests where status is 'Pending'
//         const requests = await Booking.find({ providerId: providerId, status: 'Completed' })
//             .populate('serviceId', 'name description category price location image')  // Populate service details
//             .populate('userId', 'name phone email location gender');                  // Populate user details

//         // Debug: Log the found requests
//         console.log('Found requests:', requests);

//         if (requests.length === 0) {
//             return res.status(404).json({ message: 'No completed requests found for this provider' });
//         }

//         res.status(200).json({ requests });
//     } catch (err) {
//         console.error('Error fetching assigned requests:', err.message);
//         res.status(500).json({ message: 'Server error', error: err.message });
//     }
// };


// // Accept a request
// exports.acceptRequest = async (req, res) => {
//     const token = req.headers.authorization?.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({ message: 'No token provided' });
//     }

//     try {
//         // Verify token and get provider id
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const providerId = decoded.user.id; 

//         console.log('Decoded token:', decoded);
//         // Find the pending request by request ID and update its status to 'accepted'
//         const data = await Booking.find({_id: req.params.requestId, status: "Pending"});
//         console.log('Provider ID:', data);
//         const request = await Booking.findOneAndUpdate(
//             { _id: req.params.requestId, providerId: providerId, status: "Pending" },  // Find request by provider and pending status
//             { status: "accepted" },  // Update the status to 'accepted'
//             { new: true }  // Return the updated request
//         );

//         console.log('Accepted request:', request);
//         if (!request) {
//             return res.status(404).json({ message: 'No pending request found or already accepted' });
//         }

//         res.status(200).json({ message: 'Request accepted', request });
//     } catch (err) {
//         console.error('Error accepting request:', err.message);
//         res.status(500).json({ message: 'Server error', error: err.message });
//     }
// };


// // Decline a request
// exports.declineRequest = async (req, res) => {
//     const token = req.headers.authorization?.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({ message: 'No token provided' });
//     }

//     try {
//         // Verify token and get provider id
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const providerId = decoded.user.id;

//         // Find the pending request by request ID and provider ID, then update status to 'declined'
//         const request = await Booking.findOneAndUpdate(
//             { _id: req.params.requestId, providerId: providerId, status: "pending" },  // Find request by provider and pending status
//             { status: "declined" },  // Update the status to 'declined'
//             { new: true }  // Return the updated request
//         );

//         if (!request) {
//             return res.status(404).json({ message: 'No pending request found or already declined' });
//         }

//         res.status(200).json({ message: 'Request declined', request });
//     } catch (err) {
//         console.error('Error declining request:', err.message);
//         res.status(500).json({ message: 'Server error', error: err.message });
//     }
// };


// // Complete a request
// exports.completeRequest = async (req, res) => {
//     const token = req.headers.authorization?.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({ message: 'No token provided' });
//     }

//     try {
//         // Verify token and get provider id
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const providerId = decoded.user.id;

//         // Find the accepted request by request ID and provider ID, then update status to 'completed'
//         const request = await Booking.findOneAndUpdate(
//             { _id: req.params.requestId, providerId: providerId, status: "accepted" },  // Only accepted requests can be completed
//             { status: "completed" },  // Update the status to 'completed'
//             { new: true }  // Return the updated request
//         );

//         if (!request) {
//             return res.status(404).json({ message: 'No accepted request found or already completed' });
//         }

//         res.status(200).json({ message: 'Request completed', request });
//     } catch (err) {
//         console.error('Error completing request:', err.message);
//         res.status(500).json({ message: 'Server error', error: err.message });
//     }
// };

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

        if (requests.length === 0) {
            console.log(`No pending requests found for provider ID: ${providerId}`);
            return res.status(204).send();  // Return 204 if no requests found
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

        if (requests.length === 0) {
            return res.status(204).send();  // Return 204 if no accepted requests found
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

        // Fetch completed requests where status is exactly "Completed"
        const requests = await Booking.find({
            providerId: providerId, 
            status: "completed" // Exact match for "Completed"
        })
        .populate('serviceId', 'name description category price location image')
        .populate('userId', 'name phone email location gender');

        console.log('Found requests:', requests);

        if (requests.length === 0) {
            return res.status(204).send();  // Return 204 if no completed requests found
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
            return res.status(204).send();  // Return 204 if no pending request found or already accepted
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

        console.log('Decoded token:', decoded);

        // Find the request by requestId, providerId, and ensure it's pending
        const request = await Booking.findOneAndUpdate(
            { _id: req.params.requestId, providerId: providerId, status: "Pending" },
            { status: "declined" },
            { new: true }
        );

        console.log('Declined request:', request);

        // Check if the request was found and updated
        if (!request) {
            return res.status(204).send();  // Return 204 if no pending request found or already declined
        }

        // If the request was found and updated, return success message
        res.status(200).json({ message: 'Request declined successfully', request });
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
            return res.status(204).send();  // Return 204 if no accepted request found or already completed
        }

        res.status(200).json({ message: 'Request completed', request });
    } catch (err) {
        console.error('Error completing request:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


// Delete a completed request
exports.deleteCompletedRequest = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const providerId = decoded.user.id;

        // Check if the completed request exists and belongs to the provider
        const request = await Booking.findOneAndDelete({
            _id: req.params.requestId,
            providerId: providerId,
            status: "completed"
        });

        if (!request) {
            return res.status(404).json({ message: 'No completed request found or already deleted' });
        }

        res.status(200).json({ message: 'Completed request deleted successfully', request });
    } catch (err) {
        console.error('Error deleting completed request:', err.message);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};