const Blog = require("../models/blogModel");

// GET all blogs
const getBlogs = async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.status(200).json(blogs);
};

// ✅ GET a single blog by ID
const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog", error });
  }
};

// POST create new blog
const createBlog = async (req, res) => {
  const { title, content, author } = req.body;
  const newBlog = new Blog({ title, content, author });
  const savedBlog = await newBlog.save();
  res.status(201).json(savedBlog);
};

module.exports = {
  getBlogs,
  getSingleBlog,  // ✅ Exported properly
  createBlog
};
