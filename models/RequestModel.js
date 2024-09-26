// models/Request.js
const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    providerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
    status: { type: String, enum: ['Pending', 'Accepted', 'Declined', 'Completed'], default: 'Pending' },
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Request', requestSchema);
