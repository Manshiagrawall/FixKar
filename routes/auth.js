// const express = require('express');
// const router = express.Router();
// const { register, login } = require('../controllers/authController');

// // Register a user or service provider
// router.post('/register', register);

// // Login
// router.post('/login', login);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { sendOTP, verifyOTP, createProfile, updateProfile, deleteProfile, login } = require('../controllers/authController');

// Send OTP
router.post('/sendOTP', sendOTP);

// Verify OTP
router.post('/verifyOTP', verifyOTP);

// Register after OTP verification
// router.post('/register', register);

// Login
router.post('/login', login);

router.post('/createProfile', createProfile); // Create profile
router.patch('/updateProfile/:id', updateProfile); // Update profile
router.delete('/deleteProfile/:id', deleteProfile); // Delete profile

module.exports = router;
