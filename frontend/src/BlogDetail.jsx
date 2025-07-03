import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/blogs/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!blog) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-300 mt-10 animate-pulse">
        Loading blog...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 transition-all duration-500 animate-fade-in">
      <h1 className="text-3xl font-bold mb-2 text-blue-700 dark:text-blue-400 border-b pb-2 transition-all duration-500 animate-slide-down">
        {blog.title}
      </h1>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 transition-all duration-500 animate-fade-in">
        By {blog.author || "Anonymous"} on{" "}
        {new Date(blog.createdAt).toLocaleString()}
      </p>

      <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line leading-relaxed transition-all duration-500 animate-fade-in">
        {blog.content}
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition-all duration-300 hover:scale-105 active:scale-95"
      >
        ⬅️ Back to Home
      </button>
    </div>
  );
};

export default BlogDetail;
