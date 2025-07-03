import { useState } from "react";
import { motion } from "framer-motion";

function CreateBlog({ onBlogCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBlog = { title, content, author };

    try {
      const response = await fetch("http://localhost:5000/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBlog),
      });

      if (response.ok) {
        setTitle("");
        setContent("");
        setAuthor("");
        onBlogCreated(); // refresh blog list
      }
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/60 dark:bg-white/10 backdrop-blur-md shadow-xl p-8 rounded-2xl max-w-3xl mx-auto border border-blue-100 dark:border-white/10"
    >
      <h2 className="text-2xl font-bold mb-6 text-blue-800 dark:text-blue-200 flex items-center gap-2">
        ✍️ Create a New Blog
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Blog Title"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Blog Content"
          className="w-full h-40 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition resize-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Author (optional)"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition duration-300 flex items-center gap-2"
        >
          ➕ Create Blog
        </button>
      </form>
    </motion.div>
  );
}

export default CreateBlog;
