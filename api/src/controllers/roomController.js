const Room = require("../models/Room");

exports.addRoom = async (req, res) => {
  try {
    const { hotelId, roomType, price, capacity, facilities } = req.body;

    if (!hotelId || !roomType || !price || !capacity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const room = await Room.create({
      hotel: hotelId,
      roomType,
      price,
      capacity,
      facilities,
    });

    res.status(201).json({ message: "Room added successfully", room });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate("hotel", "name address");
    res.status(200).json({ rooms });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};