import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function BlogList({ blogs }) {
  const navigate = useNavigate(); // ✅ This was missing

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-blue-800 dark:text-blue-200 flex items-center gap-2">
        📝 Latest Blog Posts
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <motion.div
            key={blog._id}
            onClick={() => navigate(`/blog/${blog._id}`)}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="bg-white/70 dark:bg-white/10 backdrop-blur-lg rounded-2xl shadow-md hover:shadow-blue-400/40 dark:hover:shadow-blue-400/30 hover:shadow-2xl border border-gray-200 dark:border-white/10 p-6 cursor-pointer transition-all"
          >
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">
              {blog.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              By {blog.author || "Anonymous"}
            </p>
            <p className="text-gray-700 dark:text-gray-200 line-clamp-3">
              {blog.content.slice(0, 120)}...
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default BlogList;
