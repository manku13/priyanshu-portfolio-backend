import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import contactRoutes from "../routes/contactRoutes.js";

const app = express();

app.use(cors({
  origin: "*",
  methods: ["POST", "OPTIONS"],
}));

app.use(express.json());

// --- Mongo cache ---
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// connect DB before routes
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("Mongo error:", err);
    return res.status(500).json({ message: "DB connection failed" });
  }
});

app.use("/api", contactRoutes);

export default app;
