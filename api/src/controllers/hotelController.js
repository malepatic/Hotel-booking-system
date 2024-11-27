const Hotel = require("../models/Hotel");

exports.addHotel = async (req, res) => {
  try {
    const { name, address, location } = req.body;

    if (!name || !address || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hotel = await Hotel.create({ name, address, location });
    res.status(201).json({ message: "Hotel added successfully", hotel });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.status(200).json({ hotels });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};