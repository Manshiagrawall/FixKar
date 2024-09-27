// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: false }, // Optional
  location: {
    country: { type: String, required: false },
    state: { type: String, required: false },
    city: { type: String, required: false },
    locality: { type: String, required: false }
  },
  gender: { type: String, required: false }, // Optional 
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('User', userSchema);
