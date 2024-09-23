const mongoose = require('mongoose');
const Service = require('../models/Service');
const jwt = require('jsonwebtoken'); // Import JWT

// Create a new service and return a token
exports.createService = async (req, res) => {
  const { name, description, price, category, location } = req.body;

  try {
    const existingService = await Service.findOne({ name });

    if (existingService) {
      return res.status(400).json({ message: 'Service with this name already exists' });
    }

    const newService = new Service({
      name,
      description,
      price,
      category,
      location,
    });

    const savedService = await newService.save();

    // Generate a JWT token with the service ID
    const token = jwt.sign({ id: savedService._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return the saved service and the token
    res.status(201).json({ service: savedService, token });
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update a service using JWT token
exports.updateService = async (req, res) => {
  const { name, description, price, category, location } = req.body; // Extract updated fields

  try {
    // Verify and decode the JWT token to get the service ID
    const decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);
    const serviceId = decoded.id;

    // Find and update the service using the ID from the token
    const updatedService = await Service.findByIdAndUpdate(
      serviceId,
      { name, description, price, category, location },
      { new: true, runValidators: true }
    );

    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Return the updated service
    res.status(200).json(updatedService);
  } catch (err) {
    console.error(`Error updating service: ${err.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a service using JWT token
exports.deleteService = async (req, res) => {
  try {
    // Verify and decode the JWT token to get the service ID
    const decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);
    const serviceId = decoded.id;

    // Find and delete the service using the ID from the token
    const deletedService = await Service.findByIdAndDelete(serviceId);

    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (err) {
    console.error(`Error deleting service: ${err.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get a specific service using JWT token
exports.getServiceByToken = async (req, res) => {
  try {
    // Verify and decode the JWT token to get the service ID
    const decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);
    const serviceId = decoded.id;

    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json(service);
  } catch (err) {
    console.error(`Error fetching service: ${err.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all services (optional)
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (err) {
    console.error(`Error fetching services: ${err.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
};