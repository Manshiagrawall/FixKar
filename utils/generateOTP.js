const crypto = require('crypto');

exports.generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

exports.generateOTPExpiry = () => {
  return new Date(Date.now() + 10 * 60000); // 10 minutes expiry
};
