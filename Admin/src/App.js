import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import UserLogin from "./components/UserLogin";
import AdminHome from "./pages/AdminHome";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import UserDashboard from "./pages/UserDashboard";
import UserHome from "./pages/UserHome";
import Navbar from "./components/Navbar"; // Unified Navbar
import UserRegistration from "./pages/UserRegistration";
// Role-Based Private Route Component
const PrivateRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  if (role !== requiredRole) {
    // Redirect to home or an unauthorized page if role doesn't match
    return <Navigate to={role === "admin" ? "/admin/home" : "/user/home"} replace />;
  }

  // Render the child component if authentication and role match
  return children;
};

const App = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== "/login" && location.pathname !== "/register";

  return (
    <>
    
      {/* Conditional Navbar */}
      {showNavbar && <Navbar />}

      <Routes>
        {/* Public Route */}
        
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegistration />} />
        {/* User Routes */}
        <Route
          path="/user/home"
          element={
            <PrivateRoute requiredRole="user">
              <UserHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/user/dashboard"
          element={
            <PrivateRoute requiredRole="user">
              <UserDashboard />
            </PrivateRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/home"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/manage-hotels"
          element={
            <PrivateRoute requiredRole="admin">
              <ManageHotels />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <PrivateRoute requiredRole="admin">
              <AdminOrders />
            </PrivateRoute>
          }
        />

        {/* Catch-All Route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
};

export default App;
