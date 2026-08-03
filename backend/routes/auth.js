const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !username.trim()) {
      return res.status(400).json({ error: "Username is required" });
    }

    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    const trimmedUsername = username.trim();

    const existingUser = await User.findOne({ username: trimmedUsername });

    if (existingUser) {
      return res.status(400).json({ error: "Username already taken" });
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      username: trimmedUsername,
      password: hashed,
    });

    res.json({ message: "Account created successfully! Please login." });
  } catch (err) {
    res.status(500).json({ error: err.message || "Something went wrong" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    const user = await User.findOne({ username: username.trim() });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ error: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, username: user.username });
  } catch (err) {
    res.status(500).json({ error: err.message || "Something went wrong" });
  }
});

// Get currently logged-in user (used to verify token on app load)
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "username profilePic"
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message || "Something went wrong" });
  }
});

// Get all users except logged-in user
router.get("/users", auth, async (req, res) => {
  try {
    const users = await User.find({
      username: { $ne: req.user.username },
    }).select("username profilePic");

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message || "Something went wrong" });
  }
});

module.exports = router;