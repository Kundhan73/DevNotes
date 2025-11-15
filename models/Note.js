import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  title: { type: String, required: true },
  content: { type: String, default: "" },

  code: { type: String, default: "" },
  language: { type: String, default: "" },

  image: { type: String, default: "" },

  category: { type: String, default: "" },
  tags: { type: [String], default: [] },

  color: { type: String, default: "Default" },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Note", noteSchema);
