const express = require("express");

const Order = require("../models/Order");
const Room = require("../models/Room");

const router = express.Router();

router.post("/create", async (req, res) => {
    const { customerName, customerEmail, room, date } = req.body;

    try {
        const newOrder = new Order({
            customerName,
            customerEmail,
            room,
            date,
            status: "Booked", // Default status
        });

        const savedOrder = await newOrder.save();
        res.status(201).json({ success: true, message: "Order created successfully", order: savedOrder });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ success: false, message: "Error creating order" });
    }
});

// Get all orders
router.get("/all", async (req, res) => {
    try {
        const orders = await Order.find().populate("room");
        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ success: false, message: "Error fetching orders" });
    }
});

// Cancel an order
router.post("/cancel/:id", async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findByIdAndUpdate(orderId, { status: "Cancelled" }, { new: true });
        if (order) {
            // Update room status to "Available"
            await Room.findByIdAndUpdate(order.room, { status: "Available" });
            res.status(200).json({ success: true, message: "Order cancelled successfully", order  });
        } else {
            res.status(404).json({ success: false, message: "Order not found" });
        }
    } catch (error) {
        console.error("Error cancelling order:", error);
        res.status(500).json({ success: false, message: "Error cancelling order" });
    }
});

module.exports = router;