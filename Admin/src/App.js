import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import Pages
import UserLogin from "./components/UserLogin";
import AdminHome from "./pages/AdminHome";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import UserDashboard  from "./pages/UserDashboard";
import AdminRegistration from "./pages/AdminRegistration";

const App = () => {
  const isAuthenticated = () => !!localStorage.getItem("token");
  const getRole = () => localStorage.getItem("role");

  return (
    <Router>
      <Routes>
        {/* Default Route */}
        <Route
          path="/"
          element={
            isAuthenticated() ? <Navigate to="/admin/home" /> : <Navigate to="/login" />
          }
        />

        {/* Public Routes */}
        <Route path="/login" element={<UserLogin />} />

        {/* Admin Routes */}
        <Route
          path="/admin/home"
          element={
            isAuthenticated() && getRole() === "admin" ? (
              <AdminHome />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
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
          path="/admin/orders"
          element={
            isAuthenticated() && getRole() === "admin" ? (
              <AdminOrders />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/admin/register"
          element={
            isAuthenticated() && getRole() === "user" ? (
              <AdminRegistration />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Catch-All */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
