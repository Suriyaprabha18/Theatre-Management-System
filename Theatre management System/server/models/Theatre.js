const mongoose = require("mongoose");

const theatreSchema = new mongoose.Schema({
  name: String,
  location: String,
  shows: [
    {
      time: String,
      type: String, // VIP, GOLD, SILVER
    },
  ],
});

module.exports = mongoose.model("Theatre", theatreSchema);