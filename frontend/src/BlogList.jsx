import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function BlogList({ blogs }) {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this blog?")) return;
  try {
    const response = await fetch(`http://localhost:5000/api/blogs/${id}`, {
      method: "DELETE",
    });

    const data = await response.json(); // Read the error message
    if (response.ok) {
      window.location.reload(); // temporary refresh
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
      <h2 className="text-2xl font-bold mb-6 text-blue-800 dark:text-blue-200 flex items-center gap-2">
        📝 Latest Blog Posts
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <motion.div
            key={blog._id}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative bg-white/70 dark:bg-white/10 backdrop-blur-lg rounded-2xl shadow-md hover:shadow-xl border border-gray-200 dark:border-white/10 p-6 cursor-pointer transition-all"
          >
            <div onClick={() => navigate(`/blog/${blog._id}`)}>
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">
                {blog.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                By {blog.author || "Anonymous"}
              </p>
              <p className="text-gray-700 dark:text-gray-200 line-clamp-3">
                {blog.content.slice(0, 120)}...
              </p>
            </div>

            {/* ❌ Delete button */}
            <button
              onClick={() => handleDelete(blog._id)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs hover:bg-red-600 transition"
              title="Delete blog"
            >
              🗑️
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default BlogList;
