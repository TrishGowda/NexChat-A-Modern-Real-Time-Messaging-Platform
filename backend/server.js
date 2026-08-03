require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
];

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/messages", require("./routes/messages"));

// 404 handler for unknown API routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({ error: "Something went wrong on the server" });
});

// ===========================
// Socket.io - Online Users & Real-Time Messaging
// ===========================
const userSocketMap = {}; // username -> socket.id

io.on("connection", (socket) => {
  console.log("✅ User Connected:", socket.id);

  socket.on("userOnline", (username) => {
    if (!username) return;
    userSocketMap[username] = socket.id;
    io.emit("onlineUsers", Object.keys(userSocketMap));
  });

  socket.on("sendMessage", (data) => {
    if (!data || !data.receiver) return;

    const receiverSocketId = userSocketMap[data.receiver];

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", data);
    }

    // Echo back to sender (so other tabs/devices of the sender stay in sync)
    socket.emit("receiveMessage", data);
  });

  socket.on("disconnect", () => {
    for (const [username, id] of Object.entries(userSocketMap)) {
      if (id === socket.id) {
        delete userSocketMap[username];
        break;
      }
    }

    io.emit("onlineUsers", Object.keys(userSocketMap));
    console.log("❌ User Disconnected:", socket.id);
  });
});

// ===========================
// MongoDB + Server Startup
// ===========================
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`🚀 Server Running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB Error");
    console.log(err);
  });