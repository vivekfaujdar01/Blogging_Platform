const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String },
}, {
  timestamps: true,
});

// ✅ Prevent OverwriteModelError
const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);

module.exports = Blog;
