const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// DB
mongoose.connect("mongodb://127.0.0.1:27017/theatre");

mongoose.connection.on("connected", () => {
  console.log("MongoDB Connected");
});

const User = require("./models/User");
const bcrypt = require("bcryptjs");

(async () => {
  try {
    const adminExists = await User.findOne({ email: "admin@gmail.com" });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 10);

      await User.create({
        name: "Admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        isAdmin: true
      });

      console.log("🔥 Admin Created");
    } else {
      console.log("✅ Admin already exists");
    }
  } catch (error) {
    console.log(error);
  }
})();
const seedTheatres = require("./seedTheatres");
seedTheatres();

// routes
const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes"); // ✅ add this

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes); // ✅ add this

const bookingRoutes = require("./routes/bookingRoutes");
app.use("/api/bookings", bookingRoutes);

const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api/payment", paymentRoutes);

const theatreRoutes = require("./routes/theatreRoutes");
app.use("/api/theatres", theatreRoutes);

const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin/bookings", adminRoutes);

// server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});