import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header"; // Import Header
import "./Monuments.css";
import image1 from "../Assets/image 1.png";
import image2 from "../Assets/image 2.png";
import image3 from "../Assets/image 3.png";
import image4 from "../Assets/image 4.png";
import image5 from "../Assets/image 5.png";

const monuments = [
  { id: 1, name: "Gateway of India", location: "Mumbai, India", image: image1, link: "/gateway-of-india" },
  { id: 2, name: "Taj Mahal", location: "Agra, India", image: image2 },
  { id: 3, name: "Qutub Minar", location: "Delhi, India", image: image3 },
  { id: 4, name: "Hawa Mahal", location: "Jaipur, India", image: image4 },
  { id: 5, name: "Charminar", location: "Hyderabad, India", image: image5 },
];

function Monuments() {
  return (
    <div className="monuments-page">
      <Header />
      <div className="monuments-container">
        <h1 className="title">🛕 HOLI SITES Page 🛕</h1>
        <p className="subtitle">Visit ancient and famous HOLI SITES .</p>

        <Link to="/" className="back-button">🏠 Back to Home</Link>

        <div className="monuments-grid">
          {monuments.map((monument) => (
            <div key={monument.id} className="monument-card">
              {/* ✅ Only wrap in <Link> if the monument has a 'link' */}
              {monument.link ? (
                <Link to={monument.link} className="monument-link">
                  <img src={monument.image} alt={monument.name} className="monument-image" />
                  <h3 className="monument-name">{monument.name}</h3>
                  <p className="monument-location">📍 {monument.location}</p>
                </Link>
              ) : (
                <>
                  <img src={monument.image} alt={monument.name} className="monument-image" />
                  <h3 className="monument-name">{monument.name}</h3>
                  <p className="monument-location">📍 {monument.location}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Monuments;
