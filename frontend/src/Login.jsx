import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        login(data.user, data.token); // ✅ update context
        alert("Login successful!");
        navigate("/");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Error logging in");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-white">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
