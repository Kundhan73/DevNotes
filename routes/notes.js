import express from "express";
import jwt from "jsonwebtoken";
import Note from "../models/Note.js";

const router = express.Router();

// Middleware: verify JWT
function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

// CREATE NOTE
router.post("/", auth, async (req, res) => {
  try {
    const note = new Note({
      ...req.body,
      userId: req.userId,
    });

    await note.save();
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET NOTES
router.get("/", auth, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.userId });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE NOTE
router.put("/:id", auth, async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );

    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE NOTE
router.delete("/:id", auth, async (req, res) => {
  try {
    await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
