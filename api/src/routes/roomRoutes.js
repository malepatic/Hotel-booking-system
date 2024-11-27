const express = require("express");
const { protect, authorize } = require("../middleware/authMiddleware");
const { addRoom, getRooms } = require("../controllers/roomController");

const router = express.Router();

router.post("/", protect, authorize("admin"), addRoom);
router.get("/", getRooms);

module.exports = router;