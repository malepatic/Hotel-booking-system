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

router.get("/all", async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json({ success: true, rooms });
    } catch (error) {
        console.error("Error fetching rooms:", error);
        res.status(500).json({ success: false, message: "Error fetching rooms", error: error.message });
    }
});

router.get("/metrics", async (req, res) => {
    try {
        const totalRooms = await Room.countDocuments();
        const occupiedRooms = await Room.countDocuments({ status: "Occupied" });
        const vacantRooms = totalRooms - occupiedRooms;

        const totalOrders = await Order.countDocuments();

        res.status(200).json({
            success: true,
            metrics: {
                totalRooms,
                occupiedRooms,
                vacantRooms,
                totalOrders,
            },
        });
    } catch (error) {
        console.error("Error fetching metrics:", error);
        res.status(500).json({ success: false, message: "Error fetching metrics" });
    }
});


module.exports = router;