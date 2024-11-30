import React, { useEffect, useState } from "react";
import { Container, Typography, Grid, Card, CardContent, CircularProgress, Alert } from "@mui/material";
import axios from "axios";

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalHotels: 0,
    totalRooms: 0,
    pendingBookings: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch metrics from the backend
  const fetchMetrics = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token"); // Retrieve token from local storage

      const headers = {
        token: `${token}`, // Add Authorization header with token
      };

      // Fetch hotels count
      const hotelsResponse = await axios.get("http://localhost:5001/api/hotels", { headers });
      console.log("Hotels Response:", hotelsResponse.data);
      const totalHotels = hotelsResponse.data.hotels?.length || 0;

      // Fetch rooms count
      const roomsResponse = await axios.get("http://localhost:5001/api/rooms/all", { headers });
      console.log("Rooms Response:", roomsResponse.data);
      const totalRooms = roomsResponse.data.rooms?.length || 0;

      // Fetch pending bookings
      const bookingsResponse = await axios.get("http://localhost:5001/api/orders?status=pending", { headers });
      console.log("Bookings Response:", bookingsResponse.data);
      const pendingBookings = bookingsResponse.data.bookings?.length || 0;

      setMetrics({
        totalHotels,
        totalRooms,
        pendingBookings,
      });
    } catch (err) {
      console.error("Error fetching metrics:", err);
      setError("Failed to load metrics. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Admin Dashboard
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={4}>
          {/* Total Hotels */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">Total Hotels</Typography>
                <Typography variant="h6">{metrics.totalHotels}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Total Rooms */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">Total Rooms</Typography>
                <Typography variant="h6">{metrics.totalRooms}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Pending Bookings */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5">Pending Bookings</Typography>
                <Typography variant="h6">{metrics.pendingBookings}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default AdminDashboard;
