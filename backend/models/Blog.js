const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    default: 'Anonymous',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
// This code defines a Mongoose schema and model for a blog post in a MongoDB database.
// The schema includes fields for the title, content, author, and creation date of the blog post.
// The model is then exported for use in other parts of the application, allowing for CRUD operations
// on blog posts in the database.
// The `createdAt` field is automatically set to the current date and time when a new blog post is created.
// The `author` field defaults to "Anonymous" if not provided.