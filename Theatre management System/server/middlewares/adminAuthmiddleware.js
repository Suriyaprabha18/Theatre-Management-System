const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No or invalid token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, "secretkey");

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(401).json({ success: false, message: "User not found" });

    // ✅ Check if user is admin
    if (!user.isAdmin) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    req.user = user;
    req.userId = user._id;

    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};