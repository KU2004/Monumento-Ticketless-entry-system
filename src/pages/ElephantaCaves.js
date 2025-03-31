import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import image2 from "../Assets/elephanta-caves.png";
import "./ElephantaCaves.css";


const GatewayOfIndia = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="gateway-page">
      <Header />

      {/* Hero Section */}
      <div className="hero-section-elephanta">
        <div className="overlay1"></div>
        <div className="content"></div>
      </div>

      {/* Main Container */}
      <div className="gateway-container">
        <div className="gateway-main">
          <div className="gateway-info">
            <h1>Elephanta Caves</h1>
            <p className="rating">⭐ 4.8/5 (2.3K Reviews)</p>
            <p className="location">📍 Elephanta Island, Mumbai</p>

            <div className="info-tags">
              <span className="tag">Historic</span>
              <span className="tag">Tourist Spot</span>
              <span className="tag">Mumbai</span>
            </div>

            <p className="entry-info">Entry: <strong>FREE</strong> | Open 24/7</p>

            <div className="button-container">
              <button className="rate-us">⭐ Rate Us</button>
              <button className="book-tour" onClick={() => navigate("/book-tickets")}>
                Book a Tour
              </button>
            </div>
          </div>

          {/* Extra Image */}
          <div className="extra-image-container">
            <img src={image2} alt="Elephanta Caves" className="extra-image" />
          </div>
        </div>

        {/* About Section */}
        <div className="about-container">
          <h2>About the Monument</h2>
          <p>
            The Elephanta Caves, located on Elephanta Island in Mumbai, are a UNESCO World Heritage Site known for their stunning rock-cut sculptures and historical significance. Dating back to the 5th–7th century CE, these caves were carved from solid basalt rock and primarily dedicated to Lord Shiva, reflecting the rich cultural and architectural heritage of ancient India.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GatewayOfIndia;
