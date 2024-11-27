const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  bookingDates: { type: [Date], required: true },
  status: { type: String, enum: ["confirmed", "cancelled"], default: "confirmed" },
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);