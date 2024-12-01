const Booking = require("../models/Booking");
const Room = require("../models/Room");
const Hotel = require("../models/Hotel");
exports.createBooking = async (req, res) => {
  try {
    const { roomId, bookingDates, customerName, customerEmail } = req.body;

    if (!roomId || !bookingDates || bookingDates.length !== 2 || !customerName || !customerEmail) {
      return res
        .status(400)
        .json({ message: "Room ID, booking dates, customer name, and email are required" });
    }

    const [checkIn, checkOut] = bookingDates;

    // Validate room existence
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Check if the room is available for the selected dates
    const isAvailable = !room.bookings.some((booking) => {
      const existingCheckIn = new Date(booking.checkIn);
      const existingCheckOut = new Date(booking.checkOut);

      return new Date(checkIn) <= existingCheckOut && new Date(checkOut) >= existingCheckIn;
    });

    if (!isAvailable) {
      return res.status(400).json({ message: "Room is not available for the selected dates" });
    }

    // Create the booking
    const booking = await Booking.create({
      userId: req.user._id,
      roomId,
      hotelId: room.hotelId,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      customerName,
      customerEmail,
      status: "confirmed",
    });

    // Add booking details to the room
    room.bookings.push({
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      bookingId: booking._id,
    });
    await room.save();

    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    console.error("Error during booking creation:", error.message); // Log detailed error
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};



// Get bookings for the logged-in user
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate("roomId", "title price")
      .populate("hotelId", "name address");

    res.status(200).json({ bookings });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Get all bookings (admin only)
exports.getAllBookingsAdmin = async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query;

    let filter = {};
    if (status) {
      filter.status = status;
    }
    if (startDate && endDate) {
      filter.checkIn = { $gte: new Date(startDate) };
      filter.checkOut = { $lte: new Date(endDate) };
    }

    const bookings = await Booking.find(filter)
      .populate("userId", "fullName email")
      .populate("roomId", "title price")
      .populate("hotelId", "name address");

    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error fetching all bookings:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// Cancel a booking
exports.cancelBooking = async (req, res) => {
  try {
    console.log("Role from request:", req.user.role); // Debug log
    const { id } = req.params;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = "canceled";
    await booking.save();

    // Remove the booking dates from the room's availability
    const room = await Room.findById(booking.roomId);
    room.bookings = room.bookings.filter(
      (roomBooking) => roomBooking.bookingId.toString() !== id
    );
    await room.save();

    res.status(200).json({ message: "Booking canceled successfully" });
  } catch (error) {
    console.error("Error canceling booking:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.cancelUserBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the booking by ID
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    console.log("User making request:", req.user.role);
    // Ensure the user is authorized to cancel the booking
    if (req.user.role !== "admin" && booking.userId?.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    // Update the booking status to "canceled"
    booking.status = "canceled";
    await booking.save();

    // Update the room's bookings to remove the canceled booking
    const room = await Room.findById(booking.roomId);
    if (room) {
      console.log("Room before update:", room.bookings);
      console.log("Booking to be removed:", {
        roomId: booking.roomId,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
      });

      // Filter out the booking based on roomId, checkIn, and checkOut dates
      const originalLength = room.bookings.length;

      room.bookings = room.bookings.filter((roomBooking) => {
        return (
          !(new Date(roomBooking.checkIn).getTime() === new Date(booking.checkIn).getTime() &&
            new Date(roomBooking.checkOut).getTime() === new Date(booking.checkOut).getTime())
        );
      });

      // Save the updated room only if the bookings array has changed
      if (room.bookings.length !== originalLength) {
        await room.save();
        console.log("Room after update:", room.bookings);
      } else {
        console.log("No changes to room bookings array.");
      }
    } else {
      console.log("Room not found for booking ID:", booking.roomId);
    }

    res.status(200).json({ message: "Booking canceled successfully" });
  } catch (error) {
    console.error("Error canceling booking:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};






// Approve a pending booking (admin only)
exports.approveBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the booking by ID
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if the booking is already approved or canceled
    if (booking.status !== "pending") {
      return res
        .status(400)
        .json({ message: "Only pending bookings can be approved" });
    }

    // Update the booking status to confirmed
    booking.status = "confirmed";
    await booking.save();

    res.status(200).json({ message: "Booking approved successfully", booking });
  } catch (error) {
    console.error("Error approving booking:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


exports.getBookingDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id)
      .populate("roomId", "title price capacity")
      .populate("hotelId", "name address")
      .populate("userId", "fullName email");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Authorization check: User can only access their own bookings
    console.log(req.user._id);
    console.log(booking.userId);
    if (req.user.role !== "admin" && booking.userId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    res.status(200).json({ booking });
  } catch (error) {
    console.error("Error fetching booking details:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.getBookingMetrics = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const totalRevenue = await Booking.aggregate([
      { $match: { status: "confirmed" } },
      { $group: { _id: null, total: { $sum: "$price" } } },
    ]);

    const totalRooms = await Room.countDocuments();
    const occupiedRooms = await Room.countDocuments({ roomStatus: "occupied" });
    const availableRooms = totalRooms - occupiedRooms;

    res.status(200).json({
      metrics: {
        totalBookings,
        totalRevenue: totalRevenue[0]?.total || 0,
        totalRooms,
        occupiedRooms,
        availableRooms,
      },
    });
  } catch (error) {
    console.error("Error fetching booking metrics:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

exports.rejectBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Update the booking status to rejected
    booking.status = "rejected";
    await booking.save();

    // Adjust room availability by removing the booking
    const room = await Room.findById(booking.roomId);
    room.bookings = room.bookings.filter(
      (b) => b.bookingId.toString() !== id
    );
    await room.save();

    res.status(200).json({ message: "Booking rejected successfully" });
  } catch (error) {
    console.error("Error rejecting booking:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


