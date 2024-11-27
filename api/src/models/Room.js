const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
  roomType: { type: String, required: true },
  price: { type: Number, required: true },
  capacity: { type: Number, required: true },
  facilities: { type: [String], default: [] },
  roomStatus: { type: String, enum: ["available", "occupied"], default: "available" },
}, { timestamps: true });

module.exports = mongoose.model("Room", roomSchema);