const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  // password: { type: String, required: true },
  address: { type: String },
  // userType: { type: String, enum: ['user', 'serviceProvider', 'admin'], required: true },
  // serviceType: { type: String },  // Only for service providers
  location: { type: String }
});

module.exports = mongoose.model('User', UserSchema);
