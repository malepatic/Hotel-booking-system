import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavBar";
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    CircularProgress,
    Snackbar,
    Alert,
    Box,
} from "@mui/material";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const fetchOrders = async () => {
        try {
            const response = await axios.get("http://localhost:5001/api/orders/all");
            setOrders(response.data.orders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelOrder = async (orderId) => {
        try {
            const response = await axios.post(`http://localhost:5001/api/orders/cancel/${orderId}`);
            if (response.data.success) {
                setSnackbarMessage("Order cancelled successfully!");
                setSnackbarSeverity("success");
                setOpenSnackbar(true);
                fetchOrders(); // Refresh orders after cancellation
            }
        } catch (error) {
            setSnackbarMessage("Error cancelling order. Please try again.");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
    <>
        <AdminNavbar />
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" color="primary" gutterBottom>
                Rooms Management
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Customer Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Room</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order._id}>
                                <TableCell>{order.customerName}</TableCell>
                                <TableCell>{order.customerEmail}</TableCell>
                                <TableCell>{order.room.title}</TableCell>
                                <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                                <TableCell>{order.status}</TableCell>
                                <TableCell>
                                    {order.status !== "Cancelled" && (
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleCancelOrder(order._id)}
                                        >
                                            Cancel
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity={snackbarSeverity}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    </>
    );
};

export default AdminOrders;
