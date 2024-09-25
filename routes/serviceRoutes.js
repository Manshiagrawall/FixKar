// const express = require('express');
// const router = express.Router();
// const { getServices, createService, updateService, deleteService, getServiceByToken } = require('../controllers/serviceController');

// // Define routes
// router.get('/', getServices); // Get all services
// router.post('/createService', createService); // Create a new service
// router.patch('/updateService', updateService); // Update a service using JWT token
// router.delete('/deleteService', deleteService); // Delete a service using JWT token
// router.get('/getService', getServiceByToken); // Get a specific service using JWT token

// module.exports = router;





const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

// Route to add a new service
router.post('/addService', serviceController.addService);

// Route to get all services by provider
router.get('/provider/getAllServices', serviceController.getServicesByProvider);

// Get a specific service by ID
router.get('/provider/getService/:id', serviceController.getServiceById);

// Route to update a service
router.put('/updateService/:id', serviceController.updateService);

// Route to delete a service
router.delete('/deleteService/:id', serviceController.deleteService);

// Route to get all services (for users)
router.get('/user/getAllServices', serviceController.getAllServices);

// Route to filter services
router.get('/filter', serviceController.filterServices);

module.exports = router;
