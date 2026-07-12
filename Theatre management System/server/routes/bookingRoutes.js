const router = require("express").Router();
const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const authMiddleware = require("../middlewares/authMiddleware"); // ✅ ADD

// ✅ CREATE BOOKING
router.post("/book-ticket", authMiddleware, async (req, res) => {
  try {
    console.log("INCOMING DATA:", req.body);

    const {
      movieId,
      movieName,
      theatreName,
      location,
      date,
      time,
      seats,
      totalAmount,
      paymentId,
    } = req.body;

    if (!movieId || !seats || seats.length === 0) {
      return res.status(400).send({
        success: false,
        message: "Missing required fields",
      });
    }

    // 🔥 prevent double booking
    const existing = await Booking.find({
      theatreName,
      date,
      time,
    });

    const alreadyBookedSeats = existing.flatMap((b) =>
      b.seats.map((s) => s.seat)
    );

    const newSeatIds = seats.map((s) => s.seat);

    const conflict = newSeatIds.some((seat) =>
      alreadyBookedSeats.includes(seat)
    );

    if (conflict) {
      return res.status(400).send({
        success: false,
        message: "Some seats already booked 😑",
      });
    }

    // ✅ SAVE BOOKING (IMPORTANT FIX)
    const booking = new Booking({
      userId: new mongoose.Types.ObjectId(req.userId), // ✅ from token
      movieId,
      movieName,
      theatreName,
      location,
      date,
      time,
      seats,
      totalAmount,
      paymentId,
    });

    await booking.save();

    res.send({
      success: true,
      message: "Booking Successful 🎉",
    });

  } catch (err) {
    console.log("BACKEND ERROR:", err);

    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});


// ✅ GET MY BOOKINGS (🔥 THIS WAS MISSING)
router.get("/my-bookings", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({
      userId: new mongoose.Types.ObjectId(req.userId),
    });

    res.send({
      success: true,
      data: bookings,
    });

  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});


// ✅ ADMIN - ALL BOOKINGS
router.get("/all-bookings", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email");

    res.send({
      success: true,
      data: bookings,
    });

  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});


// 🔥 GET BOOKED SEATS
router.post("/get-booked-seats", async (req, res) => {
  try {
    const { theatreName, date, time } = req.body;

    const bookings = await Booking.find({
      theatreName,
      date,
      time,
    });

    let bookedSeats = [];

    bookings.forEach((b) => {
      b.seats.forEach((s) => {
        bookedSeats.push(s.seat);
      });
    });

    res.send({
      success: true,
      data: bookedSeats,
    });

  } catch (err) {
    res.send({
      success: false,
      message: err.message
    });
  }
});

module.exports = router;