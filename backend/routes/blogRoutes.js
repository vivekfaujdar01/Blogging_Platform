const express = require('express');
const router = express.Router();
const {
  getBlogs,
  getSingleBlog,
  createBlog,
  deleteBlog,
  updateBlog,
} = require('../controllers/blogController');

const { protect } = require('../middleware/authMiddleware'); // ✅ Import protect middleware

// Public routes
router.get('/', getBlogs);
router.get('/:id', getSingleBlog);

// Protected routes (requires JWT)
router.post('/', protect, createBlog);
router.delete('/:id', protect, deleteBlog);
router.put('/:id', protect, updateBlog);

module.exports = router;

// This code defines the routes for the blog functionality in an Express application.
// It imports the necessary modules, sets up a router, and defines two routes:
// 1. A GET route at the root path ('/') that retrieves all blogs by calling the `getBlogs` controller function.
// 2. A POST route at the root path ('/') that creates a new blog by calling the `createBlog` controller function.
// Finally, it exports the router so that it can be used in the main application file.
// This modular approach helps keep the code organized and maintainable, allowing for easy addition of more routes in the future if needed.