const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    phone: { type: String, required: true },
    otp: { type: String, required: true },
    otpExpiration: { 
        type: Date,
        required: true,
        index: { expires: '5m' } // TTL index set to 5 minutes
    },
});

module.exports = mongoose.model('OTP', otpSchema)