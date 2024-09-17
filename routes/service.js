const express = require('express');
const router = express.Router();
const { createService, getServicesByLocation } = require('../controllers/serviceController');
const auth = require('../middlewares/auth');

// Create service
router.post('/', auth, createService);

// Get services by location
router.get('/', getServicesByLocation);

module.exports = router;
