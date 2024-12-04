import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  Alert,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddHotelModel from "./AddHotelModel";
import EditHotelModal from "./EditHotelModal";
import AddRoomModal from "./AddRoomModal"; // New component for adding rooms
import axios from "axios";

const ManageHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch hotels from the backend
  const fetchHotels = async () => {
    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("token"); // Get token from localStorage
      const headers = {
        token: `${token}`, // Add Authorization header
      };

      const response = await axios.get("http://localhost:5001/api/hotels", { headers });
      setHotels(response.data.hotels || []);
    } catch (err) {
      console.error("Error fetching hotels:", err);
      setError("Failed to load hotels. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a hotel
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          token: `${token}`,
        };
        await axios.delete(`http://localhost:5001/api/hotels/${id}`, { headers });
        setHotels((prevHotels) => prevHotels.filter((hotel) => hotel._id !== id));
        alert("Hotel deleted successfully.");
      } catch (err) {
        console.error("Error deleting hotel:", err);
        alert("Failed to delete hotel. Please try again.");
      }
    }
  };

  // Open edit modal and set the selected hotel
  const handleEdit = (hotel) => {
    setSelectedHotel(hotel);
    setIsEditModalOpen(true);
  };

  // Open add room modal and set the selected hotel
  const handleAddRoom = (hotel) => {
    setSelectedHotel(hotel);
    setIsAddRoomModalOpen(true);
  };

  // Fetch hotels on component mount
  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Manage Hotels
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <Button
            variant="contained"
            color="primary"
            sx={{ mb: 2 }}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Hotel
          </Button>
          <Grid container spacing={3}>
            {hotels.map((hotel) => (
              <Grid item xs={12} md={6} lg={4} key={hotel._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{hotel.name}</Typography>
                    <Typography variant="body2">{hotel.address}</Typography>
                    <Typography variant="body2">{hotel.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleAddRoom(hotel)}
                    >
                      Add Room
                    </Button>
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(hotel)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDelete(hotel._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* Add Hotel Modal */}
      <AddHotelModel
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onHotelAdded={fetchHotels} // Refetch hotels when a new one is added
      />

      {/* Edit Hotel Modal */}
      <EditHotelModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        hotel={selectedHotel}
        onHotelUpdated={fetchHotels} // Refetch hotels after editing
      />

      {/* Add Room Modal */}
      <AddRoomModal
        open={isAddRoomModalOpen}
        onClose={() => setIsAddRoomModalOpen(false)}
        hotelId={selectedHotel?._id} // Pass selected hotel ID to modal
      />
    </Container>
  );
};

export default ManageHotels;
