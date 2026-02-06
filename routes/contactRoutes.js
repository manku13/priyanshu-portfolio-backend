router.post("/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    await Contact.create({ name, email, subject, message });

    res.status(201).json({ message: "Message saved successfully" });
  } catch (err) {
    console.error("Contact save error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
