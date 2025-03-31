require('dotenv').config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_default_secret";

// Import User model
const User = require("./models/User");
const Booking = require("./models/Booking");
const Payment = require("./models/Payment");

const app = express();

// ========== Middleware ==========

// CORS enabled
app.use(cors({ origin: "http://localhost:3000" }));

// 🚀 Increase body size limit to handle Base64 image uploads
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Ensure express.json() middleware is present
app.use(express.json({ limit: '10mb' }));

// ========== MongoDB Connection ==========

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/HiGuest", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// ========== Routes ==========

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ===== Register User =====
app.post("/users", async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;

    // Input validation
    if (!name || !email || !password || !mobile) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Save user (password hashing handled in User model)
    const user = new User({
      name,
      email,
      password,
      mobile,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    console.error("User Registration Error:", err);
    res.status(500).json({ error: "Registration failed" });
  }
});

async function checkPassword(inputPassword, hashedPassword) {
  return bcrypt.compare(inputPassword, hashedPassword);
}

// ===== Login User =====
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Use comparePassword method from User model
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    console.log("✅ Password matched! Generating token...");
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", user, token }); // Include user object in response
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// ===== Confirm Booking =====
app.post("/confirm-booking", async (req, res) => {
  console.log('Received booking request:', req.body);

  const { date, time, ticketDetails, totalPrice, totalTickets, userId, password } = req.body;

  try {
    // Fetch user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Create booking
    const booking = new Booking({
      date,
      time,
      ticketDetails,
      totalPrice,
      totalTickets,
      user: userId
    });

    const result = await booking.save();
    console.log("Booking saved:", result);
    res.status(201).json({ message: "Booking confirmed", bookingId: result._id });
  } catch (err) {
    console.error("Error confirming booking:", err);
    res.status(500).json({ error: "Please Login before ConfirmBooking" });
  }
});

// ===== Upload Payment Screenshot =====
app.post("/upload-payment", async (req, res) => {
  try {
    const { paymentScreenshot } = req.body;

    if (!paymentScreenshot) {
      return res.status(400).json({ error: "Payment screenshot is required" });
    }

    const payment = new Payment({
      paymentScreenshot
    });

    await payment.save();

    console.log("Payment uploaded:", payment);
    res.status(201).json({ message: "Payment uploaded successfully", paymentId: payment._id });
  } catch (err) {
    console.error("Payment Upload Error:", err);
    res.status(500).json({ error: "Payment upload failed" });
  }
});

// ========== Start Server ==========
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
