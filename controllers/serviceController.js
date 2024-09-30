const Service = require('../models/Service');
const Provider = require('../models/providerModel');
const jwt = require('jsonwebtoken');

// Add a new service
exports.addService = async (req, res) => {
  const { name, description, category, price, location, image} = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  // console.log("body",req.body);
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify token and get provider id
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const providerId = decoded.user.id;
    // Ensure the provider exists
    const provider = await Provider.findById(providerId);
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    // Create and save new service
    const newService = new Service({
      provider: provider._id,
      name,
      description,
      category,
      price,
      location,
      image
    });

    await newService.save();
    res.status(201).json({ message: 'Service added successfully', service: newService });
  } catch (err) {
    console.error('Error adding service:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// View all services by provider
exports.getServicesByProvider = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify token and get provider id
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const providerId = decoded.user.id;
    console.log("provider id",providerId);
    // Find services for the provider
    const services = await Service.find({ provider: providerId });
     console.log("services",services);
    res.status(200).json({ services });
  } catch (err) {
    console.error('Error fetching services:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update service
exports.updateService = async (req, res) => {
  const { name, description, category, price, address, image } = req.body;
  const token = req.headers.authorization?.split(' ')[1];
  const { id } = req.params; // Service ID

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify token and get provider id
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const providerId = decoded.user.id;

    // Find and update the service
    let service = await Service.findOne({ _id: id, provider: providerId });
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    if (name !== undefined) service.name = name;
    if (description !== undefined) service.description = description;
    if (category !== undefined) service.category = category;
    if (price !== undefined) service.price = price;
    if (image !== undefined) service.image = image;
    if (address !== undefined) service.address = address;

    await service.save();
    res.status(200).json({ message: 'Service updated successfully', service });
  } catch (err) {
    console.error('Error updating service:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete service
exports.deleteService = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const { id } = req.params; // Service ID

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify token and get provider id
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const providerId = decoded.user.id;

    // Find and delete the service
    const service = await Service.findOneAndDelete({ _id: id, provider: providerId });
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (err) {
    console.error('Error deleting service:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
// Get all services (for users to view)
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({ services });
  } catch (err) {
    console.error('Error fetching services:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific service by ID (for provider)
exports.getServiceById = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  const { id } = req.params; // Service ID
  
  console.log("id",id);
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify token and get provider id
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const providerId = decoded.user.id;
    console.log("providerId", decoded);
    // Find the service by ID and provider
    const service = await Service.findOne({ _id: id, provider: providerId });
     
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.status(200).json(service);
  } catch (err) {
    console.error('Error fetching service:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Filter services based on query parameters
exports.filterServices = async (req, res) => {
  const { category, priceRange, rating } = req.query;

  try {
    // Build query based on parameters
    const query = {};
    if (category) query.category = category;
    if (priceRange) {
      const [min, max] = priceRange.split('-');
      query.price = { $gte: min, $lte: max };
    }
    if (rating) query.rating = { $gte: rating };

    const services = await Service.find(query);
    res.status(200).json({ services });
  } catch (err) {
    console.error('Error filtering services:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
