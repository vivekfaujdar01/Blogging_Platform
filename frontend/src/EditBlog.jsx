import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/blogs/${id}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title);
        setContent(data.content);
        setAuthor(data.author);
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedBlog = { title, content, author };

    try {
      const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBlog),
      });

      if (res.ok) {
        navigate("/");
      } else {
        alert("Failed to update blog");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-8 bg-white dark:bg-gray-900 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-white">✏️ Edit Blog</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-40 p-3 rounded border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800 resize-none"
          required
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          ✅ Update Blog
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
