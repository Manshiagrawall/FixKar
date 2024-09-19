const jwt = require('jsonwebtoken');
const Provider = require('../models/providerModel');

exports.updateProfile = async (req, res) => {
  const { name, email, phone, address } = req.body;
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const providerId = decoded.user.id;

    // Find the provider by ID
    let provider = await Provider.findById(providerId);
    if (!provider) {
      return res.status(404).json({ message: 'Service provider not found' });
    }

    // Update fields if provided in the request body
    if (name !== undefined) provider.name = name;
    if (email !== undefined) provider.email = email;
    if (phone !== undefined) provider.phone = phone;
    
    if (address !== undefined) {
      // Ensure address is an object
      if (typeof address !== 'object' || Array.isArray(address)) {
        return res.status(400).json({ message: 'Invalid address format. Must be an object with required fields.' });
      }

      // Update address fields if provided
      provider.address = {
        country: address.country || provider.address.country,
        state: address.state || provider.address.state,
        district: address.district || provider.address.district,
        city: address.city || provider.address.city,
        locality: address.locality || provider.address.locality
      };
    }

    // Save the updated provider details to the database
    await provider.save();

    // Respond with the updated provider details
    res.status(200).json({
      message: 'Profile updated successfully',
      provider: {
        id: provider._id,
        name: provider.name,
        email: provider.email,
        phone: provider.phone,
        address: provider.address
      }
    });
  } catch (err) {
    console.error('Error updating profile:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteProfile = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const providerId = decoded.user.id;

    // Find and delete the provider by ID
    const provider = await Provider.findByIdAndDelete(providerId);

    if (!provider) {
      return res.status(404).json({ message: 'Service provider not found' });
    }

    // Respond with a success message
    res.status(200).json({
      message: 'Profile deleted successfully'
    });
  } catch (err) {
    console.error('Error deleting profile:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};