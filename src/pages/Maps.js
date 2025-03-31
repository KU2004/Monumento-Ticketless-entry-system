import React from "react";
import { Link } from "react-router-dom";
import "./Monuments.css";
import Header from "./Header";

function Maps() {
  return (
    <div className="monuments-page">
      <Header />
      <div className="monuments-container">
        <h1 className="title">🗺️ Maps Page 🗺️</h1>
        <p className="subtitle">Find locations of historical sites on the map.</p>

        {/* Back to Home Link */}
        <Link to="/" className="back-button">🏠 Back to Home</Link>

        {/* Embedded Google Map for Maharashtra */}
        <iframe
          title="Google Map"
          width="100%"
          height="500"
          style={{ border: 0 }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60092606.818964705!2d60.32519531249999!3d19.125701699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcfc41e9c9cd6f9%3A0x1b2f22924be04fb6!2sMaharashtra!5e0!3m2!1sen!2sin!4v169876543210!5m2!1sen!2sin&zoom=80"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

export default Maps;