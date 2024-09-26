const mongoose = require('mongoose');


const providerModel = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String},
    accountType: { type: String},
    image: { type: String }
});

// Fix here, use module.exports instead of module.Provider
module.exports = mongoose.model('Provider', providerModel);
