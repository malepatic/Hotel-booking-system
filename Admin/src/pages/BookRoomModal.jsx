import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  Alert,
} from "@mui/material";
import axios from "axios";

const BookRoomModal = ({ open, onClose, room, checkIn, checkOut, onBookingComplete }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleBookRoom = async () => {
    try {
      setError("");
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      if (!token) {
        setError("You must be logged in to book a room.");
        return;
      }

      const headers = {
        token: `${token}`, // Include token in the Authorization header
      };

      const response = await axios.post(
        "http://localhost:5001/api/orders/book",
        {
          roomId: room._id,
          bookingDates: [checkIn, checkOut],
          customerName: name,
          customerEmail: email,
        },
        { headers }
      );

      setSuccess(true);
      setTimeout(() => {
        onBookingComplete(); // Callback to refresh data or UI after booking
        onClose(); // Close the modal
      }, 2000);
    } catch (err) {
      console.error("Error booking room:", err);
      setError("Failed to book room. Please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Book Room</DialogTitle>
      <DialogContent>
        {success && <Alert severity="success">Room booked successfully!</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Check-In"
          fullWidth
          margin="normal"
          value={checkIn}
          disabled
        />
        <TextField
          label="Check-Out"
          fullWidth
          margin="normal"
          value={checkOut}
          disabled
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleBookRoom} color="primary">
          Confirm Booking
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookRoomModal;
