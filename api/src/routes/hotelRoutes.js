const express = require("express");
const { protect, authorize } = require("../middleware/authMiddleware");
const { addHotel, getHotels } = require("../controllers/hotelController");

const router = express.Router();

router.post("/", protect, authorize("admin"), addHotel); // Admin-only route
router.get("/", getHotels); // Public route

module.exports = router;