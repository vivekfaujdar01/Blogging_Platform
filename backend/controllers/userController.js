const User = require("../models/User");
const Blog = require("../models/Blog"); // ✅ Add this to fetch blogs
const jwt = require("jsonwebtoken");

// 🔐 Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ✅ Register New User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const newUser = await User.create({ name, email, password });

    res.status(201).json({
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      token: generateToken(newUser._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

// ✅ Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

// ✅ Get Logged-in User Profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    const blogs = await Blog.find({ author: user.name });

    res.json({
      user,
      blogs,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile", error: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile, // ✅ Export added function
};
