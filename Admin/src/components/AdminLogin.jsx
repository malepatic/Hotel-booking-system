import React, { useState } from "react";
import axios from "../api/axios";

const AdminLogin = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", "admin"); // Set role
      setAuth(true);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h1>Admin Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default AdminLogin;