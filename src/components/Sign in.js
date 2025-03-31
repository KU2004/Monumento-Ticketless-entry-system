import React, { useState } from "react";
import axios from "axios";
import "./Sign in.css"; // Reuse the same CSS for consistent styling

const SignIn = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!formData.name || !formData.mobile || !formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(""); // Clear previous errors
    setLoading(true); // Set loading state

    try {
      const url = "http://localhost:5000/users"; // Correct endpoint

      const response = await axios.post(url, {
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        password: formData.password,
      });

      alert("Sign In Successful");
      onClose(); // Close modal after success
    } catch (err) {
      console.error("Error:", err.response?.data);
      setError(err.response?.data?.error || "An error occurred");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Sign In</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <label>Name</label>
          </div>

          <div className="input-box">
            <input
              type="text"
              name="mobile"
              required
              value={formData.mobile}
              onChange={handleChange}
            />
            <label>Mobile</label>
          </div>

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
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;