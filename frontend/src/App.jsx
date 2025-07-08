import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { AuthContext } from "./AuthContext";

import CreateBlog from "./CreateBlog";
import BlogList from "./BlogList";
import BlogDetail from "./BlogDetail";
import EditBlog from "./EditBlog";
import SearchBar from "./SearchBar";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const { dark, setDark } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs`);
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
            <Link to="/" className="text-3xl font-bold text-blue-600 dark:text-white flex items-center gap-2">
              📰 My MERN Blog
            </Link>

            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="text-sm text-blue-800 dark:text-blue-200 hover:underline"
                  >
                    👤 {user.name || user.email}
                  </Link>
                  <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-blue-500 hover:text-blue-700">Login</Link>
                  <Link to="/register" className="text-blue-500 hover:text-blue-700">Register</Link>
                </>
              )}

              <button
                onClick={() => setDark(!dark)}
                className="p-2 bg-yellow-300 dark:bg-gray-700 rounded-full hover:scale-105 transition"
                title="Toggle Theme"
              >
                {dark ? "🌞" : "🌙"}
              </button>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-6xl mx-auto px-4 space-y-12">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                    {user && <CreateBlog onBlogCreated={fetchBlogs} />}
                    <BlogList blogs={blogs} searchQuery={searchQuery} />
                  </>
                }
              />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/edit/:id" element={<EditBlog />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={user ? <Profile /> : <Login />} />
            </Routes>
          </main>
        </div>
      </Router>
    </div>
  );
}

export default App;
