const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({
        success: false,
        message: "No token provided"
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).send({
        success: false,
        message: "Invalid token format"
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Token missing"
      });
    }

    const decoded = jwt.verify(token, "secretkey");

    if (!decoded || !decoded.userId) {
      return res.status(401).send({
        success: false,
        message: "Invalid token"
      });
    }

    // 🔥 GET FULL USER FROM DB
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).send({
        success: false,
        message: "User not found"
      });
    }

    // ✅ store full user
    req.user = user;
    req.userId = user._id;

    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);
    return res.status(401).send({
      success: false,
      message: "Unauthorized"
    });
  }
};