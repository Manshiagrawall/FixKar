// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const OTP = require('../models/OTP');
// const { generateOTP, generateOTPExpiry } = require('../utils/generateOTP');

// // Send OTP
// exports.sendOTP = async (req, res) => {
//   const { phone } = req.body;
//   try {
//     const otpCode = generateOTP();
//     const otpExpiry = generateOTPExpiry();

//     const existingOTP = await OTP.findOne({ phone });
//     if (existingOTP) await OTP.deleteOne({ phone });

//     const otp = new OTP({ phone, code: otpCode, expiresAt: otpExpiry });
//     await otp.save();

//     // Send OTP via SMS (implement actual SMS sending)
//     console.log(`OTP for ${phone}: ${otpCode}`);

//     res.status(200).json({ message: 'OTP sent successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Verify OTP
// exports.verifyOTP = async (req, res) => {
//   const { phone, code } = req.body;
//   try {
//     const otp = await OTP.findOne({ phone, code });
//     if (!otp || otp.expiresAt < Date.now()) {
//       return res.status(400).json({ message: 'Invalid or expired OTP' });
//     }

//     await OTP.deleteOne({ phone, code });
//     res.status(200).json({ message: 'OTP verified successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Register after OTP verification
// exports.register = async (req, res) => {
//   const { name, phone, password, userType, address, serviceType, location } = req.body;
//   try {
//     let user = await User.findOne({ phone });
//     if (user) return res.status(400).json({ message: 'User already exists' });

//     user = new User({ name, phone, password, userType, address, serviceType, location });

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(password, salt);

//     await user.save();

//     // Create and return JWT token
//     const payload = { user: { id: user.id, userType: user.userType } };
//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.status(201).json({ token });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Login
// exports.login = async (req, res) => {
//   const { phone, password } = req.body;
//   try {
//     let user = await User.findOne({ phone });
//     if (!user) return res.status(400).json({ message: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const payload = { user: { id: user.id, userType: user.userType } };
//     const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

//     res.status(200).json({ token });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const twilio = require('twilio');
const User = require('../models/User');
const OTP = require('../models/OTP');
const { generateOTP, generateOTPExpiry } = require('../utils/generateOTP');

// Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const client = new twilio(accountSid, authToken);

// // Send OTP
// exports.sendOTP = async (req, res) => {
//   const { phone } = req.body;

//   console.log(`Received phone number: ${phone}`); // Debugging line

//   // Validate phone number format
//   if (!/^\+\d{10,15}$/.test(phone)) {
//     return res.status(400).json({ message: 'Invalid phone number format' });
//   }

//   try {
//     const otpCode = generateOTP();
//     const otpExpiry = generateOTPExpiry();

//     // Check if OTP already exists for the phone number and remove it
//     const existingOTP = await OTP.findOne({ phone });
//     if (existingOTP) await OTP.deleteOne({ phone });

//     // Save the new OTP to the database
//     const otp = new OTP({ phone, code: otpCode, expiresAt: otpExpiry });
//     await otp.save();

//     // Send OTP via Twilio SMS
//     await client.messages.create({
//       body: `Your OTP code is ${otpCode}`,
//       from: twilioPhoneNumber,  // Twilio number
//       to: phone  // Recipient number
//     });

//     res.status(200).json({ message: 'OTP sent successfully' });
//   } catch (err) {
//     console.error('Error sending OTP:', err.message);
//     res.status(500).json({ message: 'Error sending OTP' });
//   }
// };

// // Verify OTP
// exports.verifyOTP = async (req, res) => {
//   const { phone, code } = req.body;
//   try {
//     const otp = await OTP.findOne({ phone, code });
//     if (!otp || otp.expiresAt < Date.now()) {
//       return res.status(400).json({ message: 'Invalid or expired OTP' });
//     }

//     // Delete OTP after successful verification
//     await OTP.deleteOne({ phone, code });

//     res.status(200).json({ message: 'OTP verified successfully' });
//   } catch (err) {
//     console.error('Error verifying OTP:', err.message);
//     res.status(500).json({ message: 'Error verifying OTP' });
//   }
// };

exports.sendOTP = async (req, res) => {
  const { name, phone } = req.body;

  // Validate input
  if (!name || !phone) {
    return res.status(400).json({ message: 'Name and phone number are required.' });
  }

  // Validate phone number format
  if (!/^\+\d{10,15}$/.test(phone)) {
    return res.status(400).json({ message: 'Invalid phone number format.' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: 'User already registered.' });
    }

    // Generate OTP and its expiry
    const otpCode = generateOTP();
    const otpExpiry = generateOTPExpiry();

    // Save the new OTP to the database
    const otp = new OTP({ 
      phone, 
      code: otpCode, 
      expiresAt: otpExpiry,
      name 
    });
    await otp.save();

    // Send OTP via SMS
    await client.messages.create({
      body: `Hello ${name}, your OTP code is ${otpCode}`,
      from: twilioPhoneNumber,
      to: phone
    });

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (err) {
    console.error('Error sending OTP:', err.message);
    res.status(500).json({ message: 'Error sending OTP' });
  }
};

exports.verifyOTP = async (req, res) => {
  const { code } = req.body;

  // Check if the OTP code is provided
  if (!code) {
    return res.status(400).json({ message: 'OTP code is required.' });
  }

  try {
    // Find the most recent OTP entry in the database
    const otpEntry = await OTP.findOne().sort({ createdAt: -1 });

    // Check if an entry was found and if it's valid
    if (!otpEntry || otpEntry.code !== code || otpEntry.expiresAt < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Delete the OTP after successful verification
    await OTP.deleteOne({ _id: otpEntry._id });

    // Check if user already exists using stored phone number from otpEntry
    let user = await User.findOne({ phone: otpEntry.phone }); 

    // If user is found, return a message indicating they are already registered
    if (user) {
      return res.status(400).json({ message: 'User already registered.' });
    }

    // If user is not found, create a new one with name and phone
    user = new User({
      name: otpEntry.name,
      phone: otpEntry.phone 
    });
    
    await user.save();

    // Create payload with user data for JWT token
    const payload = { user: { id: user.id, userType: user.userType } };

    // Create and return JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'OTP verified successfully',
      token
    });
  } catch (err) {
    console.error('Error verifying OTP:', err.message);
    res.status(500).json({ message: 'Error verifying OTP' });
  }
};
// Login user
exports.login = async (req, res) => {
  const { phone } = req.body;
  try {
    // Check if user exists
    let user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate and send OTP
    const otpCode = generateOTP();
    const otpExpiry = generateOTPExpiry();

    // Check if OTP already exists for the phone number and remove it
    const existingOTP = await OTP.findOne({ phone });
    if (existingOTP) await OTP.deleteOne({ phone });

    // Save the new OTP to the database
    const otp = new OTP({ phone, code: otpCode, expiresAt: otpExpiry });
    await otp.save();

    // Send OTP via SMS (implement actual SMS sending)
    console.log(`OTP for ${phone}: ${otpCode}`);

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (err) {
    console.error('Error logging in:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create Service Provider Profile
exports.createProfile = async (req, res) => {
  const { name, email, phone, address, profilePhoto } = req.body;

  // Validate required fields
  if (!name || !phone || !address) {
    return res.status(400).json({ message: 'Name, phone number, and address are required.' });
  }

  try {
    // Create new profile
    const provider = new User({ // Assuming you're using User model for service providers
      name,
      email,
      phone,
      address,
      profilePhoto
    });

    // Save user to database
    await provider.save();

    res.status(201).json({
      message: 'Profile created successfully!',
      provider: {
        id: provider.id,
        name: provider.name,
        email: provider.email,
        phone: provider.phone,
        address: provider.address,
        profilePhoto: provider.profilePhoto
      }
    });
  } catch (err) {
    console.error('Error creating profile:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update Service Provider Profile
exports.updateProfile = async (req, res) => {
  const { id } = req.params; // Get user ID from request parameters
  const { name, email, phone, address, profilePhoto } = req.body; // Get data from request body

  try {
    // Find the service provider by ID
    let provider = await User.findById(id);
    
    if (!provider) return res.status(404).json({ message: 'Service provider not found' });

    // Update fields if provided
    if (name !== undefined) provider.name = name; // Check for undefined explicitly
    if (email !== undefined) provider.email = email; // Check for undefined explicitly
    if (phone !== undefined) provider.phone = phone; // Check for undefined explicitly
    if (address !== undefined) provider.address = address; // Check for undefined explicitly
    if (profilePhoto !== undefined) provider.profilePhoto = profilePhoto; // Check for undefined explicitly

    await provider.save(); // Save updated user

    res.status(200).json({
      message: 'Profile updated successfully',
      provider: {
        id: provider.id,
        name: provider.name,
        email: provider.email,
        phone: provider.phone,
        address: provider.address,
        profilePhoto: provider.profilePhoto
      }
    });
  } catch (err) {
    console.error('Error updating profile:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
// Delete Service Provider Profile
exports.deleteProfile = async (req, res) => {
  const { id } = req.params; // Get user ID from request parameters

  try {
    // Find the service provider by ID
    let provider = await User.findById(id);
    
    if (!provider) return res.status(404).json({ message: 'Service provider not found' });

    // Delete the service provider
    await User.deleteOne({ _id: id });

    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (err) {
    console.error('Error deleting profile:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};