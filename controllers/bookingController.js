const Booking = require('../models/Booking');

// Create a booking (user)
exports.createBooking = async (req, res) => {
  const { serviceId, date, time } = req.body;
  try {
    const newBooking = new Booking({
      user: req.user.id,
      service: serviceId,
      date,
      time
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all bookings for a service provider
exports.getBookingsForProvider = async (req, res) => {
  try {
    const bookings = await Booking.find({ provider: req.user.id });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
