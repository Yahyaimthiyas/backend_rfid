import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db.js";
import Log from "./models/Log.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("🚀 Backend API is running and MongoDB is connected!");
});

// POST /api/logs - ESP32 sends logs here
app.post("/api/logs", async (req, res) => {
  const { apiKey, room_id, card_uid, role, event_type, event_time, session_id, duration } = req.body;

  // Validate API key
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ message: "Unauthorized: invalid API key" });
  }

  if (!card_uid || !role || !event_type || !event_time || !room_id) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const log = new Log({
      room_id,
      card_uid,
      role,
      event_type,
      event_time,
      session_id: session_id || null,
      duration: duration || 0
    });
    await log.save();
    return res.status(201).json({ message: "Log saved successfully" });
  } catch (err) {
    console.error("Error saving log:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
});

// Optional GET route for testing logs
app.get("/api/logs", async (req, res) => {
  try {
    const logs = await Log.find().sort({ event_time: -1 }).limit(100);
    res.json({ logs });
  } catch (err) {
    console.error("Error fetching logs:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));
