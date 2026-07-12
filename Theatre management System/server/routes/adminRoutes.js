const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/User");

require("../models/User");

// Admin fetch all bookings
router.get("/all", authMiddleware, async (req, res) => {
  try {
   
    // Make sure only admin can access
    const user = await User.findById(req.userId);
    if (!user?.isAdmin) {
      return res.status(403).send({ success: false, message: "Access denied" });
    }

    const bookings = await Booking.find().populate("userId", "name email");
     console.log("BOOKINGS:", bookings);
    res.send({ success: true, data: bookings });
  } catch (error) {
     console.log("ERROR:", error);
    res.status(500).send({ success: false, message: error.message });
  }
});

module.exports = router;