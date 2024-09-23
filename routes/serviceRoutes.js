const express = require('express');
const router = express.Router();
const { getServices, createService, updateService, deleteService, getServiceByToken } = require('../controllers/serviceController');

// Define routes
router.get('/', getServices); // Get all services
router.post('/createService', createService); // Create a new service
router.patch('/updateService', updateService); // Update a service using JWT token
router.delete('/deleteService', deleteService); // Delete a service using JWT token
router.get('/getService', getServiceByToken); // Get a specific service using JWT token

module.exports = router;