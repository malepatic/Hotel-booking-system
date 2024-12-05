import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Container,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Box,
    CircularProgress,
} from "@mui/material";

const UserDashboard = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get("http://localhost:5001/api/rooms/all");
                setRooms(response.data.rooms);
            } catch (error) {
                console.error("Error fetching rooms:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

    if (loading) {
        return (
            <Box
                sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" color="primary" gutterBottom>
                Available Rooms
            </Typography>
            <Grid container spacing={3}>
                {rooms.map((room) => (
                    <Grid item xs={12} sm={6} md={4} key={room._id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="200"
                                image={`http://localhost:5001/${room.images[0]}`} // Adjust based on your image serving setup
                                alt={room.title}
                            />
                            <CardContent>
                                <Typography variant="h6">{room.title}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {room.description}
                                </Typography>
                                <Typography variant="subtitle1" color="textPrimary">
                                    Price: ${room.price}
                                </Typography>
                                <Typography variant="subtitle2" color="textSecondary">
                                    Capacity: {room.capacity} Person(s)
                                </Typography>
                                <Typography variant="subtitle2" color="textSecondary">
                                    Status: {room.status}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default UserDashboard;
