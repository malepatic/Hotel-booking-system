const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { bookRoom, getBookings } = require("../controllers/bookingController");

const router = express.Router();

router.post("/", protect, bookRoom);
router.get("/", protect, getBookings);

module.exports = router;