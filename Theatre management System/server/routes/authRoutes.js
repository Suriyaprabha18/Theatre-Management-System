const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Booking = require("../models/Booking");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

// 🔥 REGISTER
router.post("/register", async (req, res) => {
  console.log("REQ BODY 👉", req.body);
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.send({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: "user",
      isAdmin: false
    });

    await newUser.save();

    res.send({ success: true, message: "User registered successfully" });

  } catch (error) {
    res.send({ success: false, message: error.message });
  }
});

// 🔥 LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.send({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.send({ success: false, message: "Invalid password" });

    const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, "secretkey", { expiresIn: "1d" });

    res.send({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });

  } catch (error) {
    res.send({ success: false, message: error.message });
  }
});

// 🔥 GET USER INFO (PROTECTED)
router.get("/get-user", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.send({ success: true, data: user });
  } catch (error) {
    res.send({ success: false, message: error.message });
  }
});

// ✅ GET USER BOOKINGS (PROTECTED)
router.get("/my-bookings", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.userId });
    res.send({ success: true, data: bookings });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
});

// 🔥 REQUEST CANCEL BOOKING (PROTECTED)
router.post("/request-cancel", authMiddleware, async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId);

    if (!booking) return res.status(404).send({ success: false, message: "Booking not found" });

    if (booking.status === "cancelled") {
      return res.send({ success: false, message: "Booking already cancelled" });
    }

    booking.status = "cancel_requested";
    await booking.save();

    res.send({ success: true, message: "Cancel request sent" });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
});

// 🔥 ADMIN HANDLE CANCEL REQUEST (PROTECTED + ADMIN CHECK)
router.post("/handle-cancel", authMiddleware, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).send({ success: false, message: "Not authorized" });
    }

    const { bookingId, action } = req.body;
    const booking = await Booking.findById(bookingId);

    if (!booking) return res.status(404).send({ success: false, message: "Booking not found" });

    if (action === "approve") {
      booking.status = "cancelled";
    } else if (action === "reject") {
      booking.status = "booked";
    } else {
      return res.status(400).send({ success: false, message: "Invalid action" });
    }

    await booking.save();
    res.send({ success: true, message: `Cancel ${action}ed successfully` });

  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
});

module.exports = router;