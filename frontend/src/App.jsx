import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import CreateBlog from "./CreateBlog";
import BlogList from "./BlogList";
import BlogDetail from "./BlogDetail";
import EditBlog from "./EditBlog";
import SearchBar from "./SearchBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const { dark, setDark } = useContext(ThemeContext);
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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
        <div className="relative z-10 bg-gradient-to-br from-[#eef2f3] to-[#dff9fb] dark:from-gray-900 dark:to-gray-800 transition-all min-h-screen">
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

          {/* Main */}
          <main className="max-w-6xl mx-auto px-4 space-y-12">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <SearchBar
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                    />
                    <CreateBlog onBlogCreated={fetchBlogs} />
                    <BlogList blogs={blogs} searchQuery={searchQuery} />
                  </>
                }
              />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/edit/:id" element={<EditBlog />} />
            </Routes>
          </main>
        </div>
      </Router>
    </div>
  );
}

export default App;
