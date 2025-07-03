import { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";
import CreateBlog from "./CreateBlog";
import BlogList from "./BlogList";
import BlogDetail from "./BlogDetail";
import ParticlesBackground from "./ParticlesBackground";

function App() {
  const { dark, setDark } = useContext(ThemeContext);
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/blogs");
      const data = await response.json();
      setBlogs(data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className={`min-h-screen ${dark ? "dark" : ""}`}>
      <Router>
        <ParticlesBackground />

        {/* Wrapper must be relative and z-10 */}
        <div className="relative z-10 min-h-screen bg-gradient-to-br from-[#eef2f3] to-[#dff9fb] dark:from-gray-900 dark:to-gray-800 transition-all">
          {/* Header */}
          <header className="flex justify-between items-center px-6 py-4 bg-white/80 dark:bg-gray-900 shadow-md backdrop-blur-lg rounded-b-xl mb-8">
            <h1 className="text-3xl font-bold text-blue-600 dark:text-white flex items-center gap-2">
              📰 My MERN Blog
            </h1>
            <button
              onClick={() => setDark(!dark)}
              className="p-2 bg-yellow-300 dark:bg-gray-700 rounded-full hover:scale-105 transition"
              title="Toggle Theme"
            >
              {dark ? "🌞" : "🌙"}
            </button>
          </header>

          {/* Page Routes */}
          <main className="max-w-6xl mx-auto px-4 space-y-12">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <CreateBlog onBlogCreated={fetchBlogs} />
                    <BlogList blogs={blogs} />
                  </>
                }
              />
              <Route path="/blog/:id" element={<BlogDetail />} />
            </Routes>
          </main>
        </div>
      </Router>
    </div>
  );
}

export default App;
