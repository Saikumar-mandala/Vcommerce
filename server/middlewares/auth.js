const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const auth = async (req, res, next) => {
  try {
    // Check if the token exists in cookies
    const token = req.cookies.token;
    if (!token) {
      console.log("Authentication failed: No token provided");
      return res.status(401).json({ message: "No token found. Please login." });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.userId) {
      console.log("Invalid token structure");
      return res
        .status(401)
        .json({ message: "Unauthorized access. Invalid token." });
    }

    // Fetch user based on decoded token
    const user = await User.findById(decoded.userId);
    if (!user) {
      console.log("Authentication failed: User not found for token");
      return res.status(404).json({ message: "User not found." });
    }

    // Attach user to the request object
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    res.status(401).json({
      message: "Unauthorized access. Invalid or expired token.",
      error: error.message,
    });
  }
};

const isAdmin = (req, res, next) => {
  const isAdmin = req.user && req.user.role === "admin";
  if (!isAdmin) {
    return res
      .status(403)
      .json({ success: false, message: "You are not an admin" });
  }
  next();
};

module.exports = { auth, isAdmin };


