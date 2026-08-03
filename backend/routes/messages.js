const router = require("express").Router();
const Message = require("../models/Message");
const auth = require("../middleware/auth");

// Get conversation between logged-in user and :receiver
router.get("/:receiver", auth, async (req, res) => {
  try {
    const sender = req.user.username;
    const { receiver } = req.params;

    const messages = await Message.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to load messages" });
  }
});

// Send / save a message
router.post("/", auth, async (req, res) => {
  try {
    const { receiver, text } = req.body;

    if (!receiver || !text || !text.trim()) {
      return res
        .status(400)
        .json({ error: "Receiver and message text are required" });
    }

    const message = await Message.create({
      sender: req.user.username,
      receiver,
      text: text.trim(),
    });

    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message || "Failed to send message" });
  }
});

module.exports = router;