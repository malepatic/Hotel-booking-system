const Booking = require("../models/Order");

exports.bookRoom = async (req, res) => {
  try {
    const { roomId, bookingDates } = req.body;

    if (!roomId || !bookingDates || bookingDates.length === 0) {
      return res.status(400).json({ message: "Room and booking dates are required" });
    }

    const booking = await Booking.create({
      user: req.user._id,
      room: roomId,
      bookingDates,
    });

    res.status(201).json({ message: "Room booked successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("room", "roomType price");
    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};