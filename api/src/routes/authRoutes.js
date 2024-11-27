const express = require("express");
const { register, login } = require("../controllers/authController");

const router = express.Router();

// Routes for user registration and login
router.post("/register", register); // Handles user registration
router.post("/login", login);       // Handles user login

module.exports = router;