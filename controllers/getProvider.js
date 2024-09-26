const Provider = require('../models/providerModel');
const jwt = require('jsonwebtoken');

exports.getProvider = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log("token",token)
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    try {
      // Verify token and get provider id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const providerId = decoded.user.id;
      console.log("token",decoded)
      // Find services for the provider
      const user = await Provider.find({ _id: providerId });
      
      console.log("user",user)
      res.status(200).json({ user });
    } catch (err) {
      console.error('Error fetching Provider:', err.message);
      res.status(500).json({ message: 'Server error' });
    }
  };

  exports.updateProvider = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log("Token:", token);
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        console.log("body",req.body);
        // Verify the token and get the provider ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const providerId = decoded.user.id;
        console.log("Decoded token:", decoded);

        // Extract data from request body
        const { name, email, image } = req.body;

        // Prepare update object
        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email; // Optional
        if (image) updateData.image = image; // Optional

        // Update the provider information
        const updatedUser = await Provider.findByIdAndUpdate(providerId, updateData, {
            new: true, // Return the updated document
            runValidators: true, // Validate before updating
        });

        if (!updatedUser) {
            return res.status(404).json({ message: 'Provider not found' });
        }
       
        // Send response with updated user data
        res.status(200).json({ user: updatedUser });
    } catch (err) {
        console.error('Error updating provider:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
};