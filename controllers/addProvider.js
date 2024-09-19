const Provider = require("../models/providerModel");
const { generateOTP, generateOTPExpiry } = require("../utils/generateOTP");
const OTP = require("../models/otpModel");
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
exports.addProvider = async (req, res) => {
  const { name, phone } = req.body;
  try {
    const existingPhone = await Provider.findOne({ phone });
    if (existingPhone) {
      return res
        .status(400)
        .json({ message: "This number already registered with us" });
    }
    // Generate OTP and its expiry
    const otpCode = generateOTP();
    const otpExpiry = generateOTPExpiry();

    // Save the new OTP to the database
    const otp = new OTP({
      phone,
      otp: otpCode,
      otpExpiration: otpExpiry,
    });
    await otp.save();

    // Send OTP via SMS
    await client.messages.create({
      body: `Hello ${name}, your OTP code is ${otpCode} will valid only for 5 minutes.`,
      from: twilioPhoneNumber,
      to: phone,
    });

    res.status(200).json({
      user: { name: name, phone: phone },
      message: "OTP sent successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", err });
  }
};
