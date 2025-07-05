import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function BlogList({ blogs, searchQuery }) {
  const navigate = useNavigate();

  // 🧠 Filter based on search
  const filteredBlogs = blogs.filter((blog) => {
    const query = searchQuery.toLowerCase();
    return (
      blog.title.toLowerCase().includes(query) ||
      (blog.author && blog.author.toLowerCase().includes(query))
    );
  });

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (response.ok) {
        window.location.reload(); // Refresh blog list
      } else {
        console.error("Delete failed:", data);
        alert("Failed to delete blog: " + data.message);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting blog.");
    }
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-blue-700 dark:text-blue-300 flex items-center gap-2">
        📝 Latest Blog Posts
      </h2>

      {filteredBlogs.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No blogs found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog, idx) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: idx * 0.07,
                duration: 0.4,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              whileHover={{
                scale: 1.07,
                boxShadow:
                  "0 8px 32px 0 rgba(59,130,246,0.25), 0 1.5px 8px 0 rgba(59,130,246,0.15)",
              }}
              className="relative bg-blue-50/80 dark:bg-blue-900/30 backdrop-blur-lg rounded-2xl shadow-md border border-blue-200 dark:border-blue-700 p-6 transition-all duration-300"
            >
              {/* Clickable area for detail page */}
              <div
                onClick={() => navigate(`/blog/${blog._id}`)}
                className="cursor-pointer"
              >
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2 mt-3 transition-colors duration-200">
                  {blog.title}
                </h3>
                <p className="text-sm text-blue-500 dark:text-blue-300 mb-2 transition-colors duration-200">
                  By {blog.author || "Anonymous"}
                </p>
                <p className="text-blue-700 dark:text-blue-100 line-clamp-3 transition-colors duration-200">
                  {blog.content.slice(0, 120)}...
                </p>
              </div>

              {/* 🗑️ Delete button */}
              <button
                onClick={() => handleDelete(blog._id)}
                className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs hover:bg-red-600 transition-colors duration-200"
                title="Delete blog"
              >
                🗑️
              </button>

              {/* ✏️ Edit button */}
              <button
                onClick={() => navigate(`/edit/${blog._id}`)}
                className="absolute top-2 left-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white px-2 py-1 rounded-md text-sm shadow hover:from-blue-500 hover:to-blue-700 hover:scale-105 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                title="Edit blog"
              >
                ✏️
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}

export default BlogList;
