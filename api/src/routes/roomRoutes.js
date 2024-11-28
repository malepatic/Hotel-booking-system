const express = require("express");
const { protect, authorize } = require("../middleware/authMiddleware");
const { addRoom, getRooms } = require("../controllers/roomController");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();
const Room = require("../models/Room");


router.post("/create", upload.array("images", 5), async (req, res) => {
    const { title, description, price, capacity, status } = req.body;
    const images = req.files.map((file) => file.path);

    try {
        const newRoom = new Room({ title, description, price, capacity, status, images });
        const savedRoom = await newRoom.save();
        res.status(201).json({ success: true, message: "Room created successfully", room: savedRoom });
    } catch (error) {
        console.error("Error creating room:", error);
        res.status(500).json({ success: false, message: "Error creating room", error: error.message });
    }
});

module.exports = router;