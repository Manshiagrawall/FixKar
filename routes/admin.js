const express = require('express');
const router = express.Router();
const { getUsers, getServiceProviders, deleteUser, getComplaints } = require('../controllers/adminController');
const auth = require('../middlewares/auth');

// Admin routes
router.get('/users', auth, getUsers);
router.get('/providers', auth, getServiceProviders);
router.delete('/deleteUser/:userId', auth, deleteUser);
router.get('/complaints', auth, getComplaints);

module.exports = router;
