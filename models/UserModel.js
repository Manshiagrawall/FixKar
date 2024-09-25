const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  locality: { type: String, required: true }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  gender: { type: String },
  location: locationSchema
});

module.exports = mongoose.model('User', userSchema);
