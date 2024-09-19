const express = require('express');
const router = express.Router();
const { addProvider } = require('../controllers/addProvider');
const { verifyProvider } = require('../controllers/verifyProvider');
const { loginProvider } = require('../controllers/loginProvider');
const { verifyLogin } = require('../controllers/verifyLogin');
const { updateProfile } = require('../controllers/providerProfile'); // Ensure this is correctly importing
const { deleteProfile } = require('../controllers/providerProfile');

// Send OTP
router.post('/sendOTP', addProvider);

// Verify OTP
router.post('/verifyOTP', verifyProvider);

// Login OTP
router.post('/sendOTPLogin', loginProvider);

// Verify Login OTP
router.post('/verifyLogin', verifyLogin);

// Update profile with token verification
router.put('/updateProfile', updateProfile); // Make sure updateProfile is correctly referenced

// New route for deleting a provider
router.delete('/deleteProfile', deleteProfile);
module.exports = router;