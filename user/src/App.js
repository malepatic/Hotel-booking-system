import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchRooms from "./pages/SearchRooms";
import Login from "./pages/Login";
import RoomDetails from "./pages/RoomDetails";
import TouristGuide from "./pages/TouristGuide";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/search-rooms"
          element={
            <PrivateRoute>
              <SearchRooms />
            </PrivateRoute>
          }
        />
        <Route
          path="/room/:id"
          element={
            <PrivateRoute>
              <RoomDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/tourist-guide"
          element={
            <PrivateRoute>
              <TouristGuide />
            </PrivateRoute>
          }
        />

        {/* Catch-All */}
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;