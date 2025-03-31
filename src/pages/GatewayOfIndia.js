import React from "react";
import Header from "./Header";
import image2 from "../Assets/gateway-india-mumbai-india.png"; // New image beside booking
import "./GatewayOfIndia.css";

const GatewayOfIndia = () => {
  return (
    <div className="gateway-page">
      <Header />

      {/* Hero Section with Background Image */}
      <div className="hero-section">
        <div className="overlay1"></div>
        <div className="content">
          
        </div>
      </div>

      {/* Main Container */}
      <div className="gateway-container">
        {/* Top Section */}
        <div className="gateway-main">
          {/* Info Section */}
          <div className="gateway-info">
            <h1>Gateway of India</h1>
            <p className="rating">⭐ 4.8/5 (2.3K Reviews)</p>
            <p className="location">📍 Chhatrapati Shivaji Maharaj Terminus, Mumbai</p>

            <div className="info-tags">
              <span className="tag">Historic</span>
              <span className="tag">Tourist Spot</span>
              <span className="tag">Mumbai</span>
            </div>

            <p className="entry-info">Entry: <strong>FREE</strong> | Open 24/7</p>

            <div className="button-container">
              <button className="rate-us">⭐ Rate Us</button>
              <button className="book-tour">Book a Tour</button>
            </div>
          </div>

          {/* Extra Image (Image 2 beside booking info) */}
          <div className="extra-image-container">
            <img src={image2} alt="Extra Image" className="extra-image" />
          </div>
        </div>

        {/* About Section */}
        <div className="about-container">
          <h2>About the Monument</h2>
          <p>
            The Gateway of India, completed in 1924, is an iconic monument located in Mumbai, India.
            Built to commemorate the landing of King George V and Queen Mary in 1911, it stands as a
            symbol of colonial heritage and independence. Overlooking the Arabian Sea, this grand archway
            remains one of Mumbai’s top tourist attractions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GatewayOfIndia;
