const Provider = require('../models/providerModel');
const OTP = require('../models/otpModel');
const jwt = require('jsonwebtoken');

exports.verifyProvider = async (req, res) => {
    const { name, phone, code } = req.body;
     console.log(name,phone,code);
    // Check if the OTP code is provided
    if (!code) {
      return res.status(400).json({ message: 'OTP code is required.' });
    }
  
    try {
      // Find the most recent OTP entry in the database
      const otpEntry = await OTP.findOne({ phone }).sort({ otpExpiration: -1 });

      console.log("otp entry",otpEntry);
      // Check if an entry was found and if it's valid
      if (!otpEntry || otpEntry.otp !== code) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
      }
  
      // Delete the OTP after successful verification
      await OTP.deleteOne({ _id: otpEntry._id });

      // If user is not found, create a new one with name and phone
      let user = new Provider({
        name: name, // Store name from OTP entry
        phone: phone // Store phone from OTP entry 
      });
      
      await user.save(); // Save new user to the database
  
      // Create payload with user data for JWT token
      const payload = { user: { id: user._id, userPhone: user.phone } };
  
      // Create and return JWT token
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
      console.log("Humne to kardiya ",token);
      return res.status(200).json({
        message: 'OTP verified successfully',
        token
    });
    } catch (err) {
      console.error('Error verifying OTP:', err.message);
      res.status(500).json({ message: 'Error verifying OTP' });
    }
  };