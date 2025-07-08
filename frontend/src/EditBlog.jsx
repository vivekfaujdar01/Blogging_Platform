import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [blog, setBlog] = useState({
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`);
        const data = await res.json();

        if (res.ok) {
          setBlog({ title: data.title, content: data.content });
        } else {
          setError(data.message || "Failed to fetch blog");
        }
      } catch (err) {
        setError("Error fetching blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.token) {
      alert("You must be logged in to edit blogs.");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(blog),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Blog updated successfully!");
        navigate(`/blog/${id}`);
      } else {
        alert(data.message || "Failed to update blog");
      }
    } catch (err) {
      alert("Error updating blog");
      console.error(err);
    }
  };

  if (loading)
    return (
      <p className="text-center mt-6 text-gray-700 dark:text-gray-200">
        Loading...
      </p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 mt-6 dark:text-red-400">
        {error}
      </p>
    );

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <h2 className="text-3xl font-extrabold mb-6 text-blue-600 dark:text-blue-400 text-center">
        Edit Blog
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="title"
          value={blog.title}
          onChange={handleChange}
          placeholder="Blog Title"
          required
          className="w-full px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <textarea
          name="content"
          value={blog.content}
          onChange={handleChange}
          placeholder="Blog Content"
          required
          className="w-full px-5 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 h-48 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-700 text-white py-3 rounded-lg font-semibold shadow hover:from-blue-700 hover:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-800 transition"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}

export default EditBlog;
