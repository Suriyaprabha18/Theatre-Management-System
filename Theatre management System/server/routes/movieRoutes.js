const express = require("express");
const router = express.Router();
const Movie = require("../models/movieModel");
const authMiddleware = require("../middlewares/authMiddleware");


// 🔥 ADD MOVIE (Protected)
router.post("/add-movie", authMiddleware, async (req, res) => {
  try {
    console.log("BODY DATA 👉", req.body);
    const newMovie = new Movie(req.body);
    await newMovie.save();

    res.send({
      success: true,
      message: "Movie added successfully"
    });
  } catch (error) {
     console.log(error);
    res.send({
      success: false,
      message: error.message
    });
  }
});


// 🔥 GET ALL MOVIES
router.get("/get-all-movies", async (req, res) => {
  try {
    const movies = await Movie.find();

    res.send({
      success: true,
      data: movies
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message
    });
  }
});


// 🔥 DELETE MOVIE
router.post("/delete-movie", authMiddleware, async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.body.movieId);

    res.send({
      success: true,
      message: "Movie deleted"
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;