const mongoose = require('mongoose');

// Use mongoose.Schema here
const addressSchema = new mongoose.Schema({
    country: { type: String, required: true },
    state: { type: String, required: true },
    district: { type: String, required: true },
    city: { type: String, required: true },
    locality: { type: String, required: true }
});

const providerModel = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String},
    accountType: { type: String},
    address: {
        type: addressSchema // No need for curly braces around addressSchema
    }
});

// Fix here, use module.exports instead of module.Provider
module.exports = mongoose.model('Provider', providerModel);
