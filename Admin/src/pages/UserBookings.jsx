import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("token");
      const headers = { token: `${token}` };

      const response = await axios.get("http://localhost:5001/api/orders/user", {
        headers,
      });
      setBookings(response.data.bookings || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to load bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        const token = localStorage.getItem("token");
        const headers = { token: `${token}` };

        await axios.put(
          `http://localhost:5001/api/orders/${id}/cancel`,
          {},
          { headers }
        );

        setSuccessMessage("Booking canceled successfully.");
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking._id === id ? { ...booking, status: "canceled" } : booking
          )
        );

        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } catch (err) {
        console.error("Error canceling booking:", err);
        setError("Failed to cancel booking. Please try again.");
      }
    }
  };

  const viewBookingDetails = (id) => {
    navigate(`/user/bookings/${id}`);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Your Bookings
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          {successMessage && <Alert severity="success">{successMessage}</Alert>}
          {bookings.length === 0 ? (
            <Typography>No bookings found.</Typography>
          ) : (
            <Grid container spacing={3}>
              {bookings.map((booking) => {
                const isCancelable =
                  booking.status === "confirmed" &&
                  new Date(booking.checkIn) > new Date();

                return (
                  <Grid item xs={12} md={6} lg={4} key={booking._id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">
                          {booking.hotel?.name}
                        </Typography>
                        <Typography>Room: {booking.room?.title}</Typography>
                        <Typography>
                          Check-In: {new Date(booking.checkIn).toDateString()}
                        </Typography>
                        <Typography>
                          Check-Out: {new Date(booking.checkOut).toDateString()}
                        </Typography>
                        <Typography>Status: {booking.status}</Typography>
                        <Button
                          variant="outlined"
                          sx={{ mt: 2, mr: 2 }}
                          onClick={() => viewBookingDetails(booking._id)}
                        >
                          View Details
                        </Button>
                        {isCancelable && (
                          <Button
                            variant="contained"
                            color="error"
                            sx={{ mt: 2 }}
                            onClick={() => cancelBooking(booking._id)}
                          >
                            Cancel Booking
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </>
      )}
    </Container>
  );
};

export default UserBookings;
