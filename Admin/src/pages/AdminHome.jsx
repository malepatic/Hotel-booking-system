import React from "react";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

// Sample placeholder data
const roomData = [
    { name: "Occupied Rooms", value: 60 },
    { name: "Vacant Rooms", value: 40 },
];

const bookingTrends = [
    { month: "Jan", bookings: 30 },
    { month: "Feb", bookings: 50 },
    { month: "Mar", bookings: 45 },
    { month: "Apr", bookings: 60 },
    { month: "May", bookings: 80 },
    { month: "Jun", bookings: 70 },
];

const COLORS = ["#0088FE", "#FFBB28"];

const AdminHome = () => {
    return (
            <Container>
                <Typography variant="h4" color="primary" gutterBottom maxWidth="lg" sx={{ mt: 4 }}>
                    Admin Dashboard
                </Typography>
                <Grid container spacing={4}>
                    {/* Total Metrics */}
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">Total Rooms</Typography>
                                <Typography variant="h6">100</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">Total Bookings</Typography>
                                <Typography variant="h6">300</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">Pending Approvals</Typography>
                                <Typography variant="h6">15</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Pie Chart: Room Distribution */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" color="textSecondary">
                            Room Distribution
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={roomData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {roomData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </Grid>

                    {/* Bar Chart: Booking Trends */}
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" color="textSecondary">
                            Booking Trends
                        </Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={bookingTrends}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="bookings" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Grid>
                </Grid>
            </Container>
    );
};

export default AdminHome;
