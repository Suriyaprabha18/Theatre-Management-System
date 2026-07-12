const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
},
  movieId: String,
  movieName: String,
  theatreName: String,
  location: String,
  date: String,
  time: String,

  seats: [
  {
    seat: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  }
],

  totalAmount: Number,
  paymentId: String,
  status: {
    type: String,
    default: "booked" // booked | cancel_requested | cancelled
  }
});

module.exports = mongoose.model("bookings_v2", bookingSchema);