const router = require("express").Router();
const Theatre = require("../models/Theatre");

// ✅ Get theatres by location
router.get("/get-theatres/:location", async (req, res) => {
  try {
    const theatres = await Theatre.find({
      location: req.params.location
    });

    res.send({ success: true, data: theatres });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;