const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true },
  price: { type: Number, required: true },
  capacity: { type: Number, required: true },
  roomStatus: { type: String, enum: ["available", "occupied"], default: "available" },
}, { timestamps: true });

module.exports = mongoose.model("Room", roomSchema);