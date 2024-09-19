const crypto = require('crypto');

exports.generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

exports.generateOTPExpiry = () => {
  const expiry = new Date();
  expiry.setMinutes(expiry.getMinutes() + 5); // Set OTP expiry to 5 minutes from now
  return expiry;
};