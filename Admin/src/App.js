import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import Pages
import UserLogin from "./components/UserLogin";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import RoomManagement from "./pages/RoomManagement";
import OrderManagement from "./pages/OrderManagement";
import UserManagement from "./pages/UserManagement";
import AdminRegistration from "./pages/AdminRegistration";

const App = () => {
  const isAuthenticated = () => !!localStorage.getItem("token");
  const getRole = () => localStorage.getItem("role");

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<UserLogin />} />
        <Route path="/admin/register" element={<AdminRegistration />} />

        {/* Home Route */}
        <Route
          path="/home"
          element={
            isAuthenticated() ? (
              getRole() === "admin" ? (
                <Navigate to="/admin/dashboard" />
              ) : getRole() === "user" ? (
                <Navigate to="/user/dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            isAuthenticated() && getRole() === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admin/rooms"
          element={
            isAuthenticated() && getRole() === "admin" ? (
              <RoomManagement />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admin/orders"
          element={
            isAuthenticated() && getRole() === "admin" ? (
              <OrderManagement />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admin/users"
          element={
            isAuthenticated() && getRole() === "admin" ? (
              <UserManagement />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* User Routes */}
        <Route
          path="/user/dashboard"
          element={
            isAuthenticated() && getRole() === "user" ? (
              <UserDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;