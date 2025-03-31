import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Optional: Add styles

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="left">
        <Link to="/">Monuments</Link>
        <Link to="/forts">Forts</Link>
        <Link to="/sanctuaries">Sanctuaries</Link>
        <Link to="/temples">Temples</Link>
        <Link to="/palaces">Palaces</Link>
        <Link to="/caves">Caves</Link>
        <Link to="/museums">Museums</Link>
      </div>
      <div className="right">
        <Link to="/maps">Maps</Link>
        <Link to="/offers">Offers</Link>
        <Link to="/gift-cards">Gift Cards</Link>
      </div>
    </nav>
  );
};

export default Navbar;
