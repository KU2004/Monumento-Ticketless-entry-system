import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HiGuest.css";

const HiGuest = ({ onClose, openSignUp }) => { // Add openSignUp prop
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    console.log("HiGuest component rendered");
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const payload = {
        email: formData.email.trim(),
        password: formData.password, // Do not trim the password
      };
      console.log("🔹 Submitting payload:", payload); // Debugging log
      const response = await axios.post(
        "http://localhost:5000/login", // Ensure URL is correct
        payload,
        {
          headers: {
            "Content-Type": "application/json", // Ensure correct headers
          },
        }
      );

      console.log("✅ Login successful. Response:", response.data); // Debugging log

      localStorage.setItem("user", JSON.stringify(response.data.user)); // Ensure user object is stored
      localStorage.setItem("token", response.data.token);

      alert("Login Successful");
      window.location.reload(); // Refresh page to update UI
    } catch (err) {
      console.error("❌ Login error:", err.response?.data); // Debugging log
      setError(err.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
            <label>Email</label>
          </div>

          <div className="input-box password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
            <label>Password</label>
            <span className="eye-icon" onClick={togglePasswordVisibility}>
              {showPassword ? "👁️" : "🙈"}
            </span>
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="signup-link">
          Don't have an account?{" "}
          <button className="link-btn" onClick={openSignUp}>
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default HiGuest;