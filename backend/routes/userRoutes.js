const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile, // ⬅ Add this
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware"); // ⬅ Import middleware

const router = express.Router();

// 🔐 Auth Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// 👤 Profile Route (protected)
router.get("/profile", protect, getUserProfile); // ✅ Add this

module.exports = router;
