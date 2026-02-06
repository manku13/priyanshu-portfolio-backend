import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

router.post("/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // 🔐 validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({
        message: "Name, email and message are required",
      });
    }

    // basic email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // save to DB
    await Contact.create({
      name: name.trim(),
      email: email.trim(),
      subject: subject?.trim() || "",
      message: message.trim(),
    });

    return res.status(201).json({
      message: "Message saved successfully",
    });
  } catch (err) {
    console.error("Contact save error:", err);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

export default router;
