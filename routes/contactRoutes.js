import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

router.post("/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    await Contact.create({ name, email, subject, message });

    res.status(201).json({ message: "Message saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
