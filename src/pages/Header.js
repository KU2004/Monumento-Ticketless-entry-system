import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "../Assets/Monumento.png"; // Replace with actual logo path
import SearchIcon from "../Assets/search.png"; // Import search icon
import HiGuest from "../components/HiGuest"; // Import HiGuest component

function Header() {
  const [showHiGuest, setShowHiGuest] = useState(false);
  const [user, setUser] = useState(null); // State to store logged-in user

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse and set user data
    }
  }, []);

  const openHiGuest = () => setShowHiGuest(true);
  const closeHiGuest = () => setShowHiGuest(false);

  const logout = () => {
    localStorage.removeItem("user"); // Clear user data from localStorage
    setUser(null); // Reset user state
    setShowHiGuest(false); // Ensure HiGuest modal is closed
  };

  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="brand-name">
          <span className="highlight"></span>
        </h1>
      </div>
      <div className="Searchbar">
        <img className="searchIcon" src={SearchIcon} alt="Search" />
        <input type="text" placeholder="Search for Monument..." />
      </div>
      <button 
        className="district-button" 
        onClick={() => console.log("District button clicked!")} // Add functionality if needed
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff", // Changed to blue
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "14px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = "#0056b3"} // Adjusted hover color
        onMouseLeave={(e) => e.target.style.backgroundColor = "#007bff"} // Adjusted hover color
      >
        Select District
      </button>
      <div className="profile">
        {user ? (
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <button
              className="user-name-btn"
              style={{
                marginLeft: "10px",
                padding: "10px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "50%", // Make it circular
                cursor: "pointer",
                width: "40px", // Set width for circular shape
                height: "40px", // Set height for circular shape
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "16px", // Adjust font size
                fontWeight: "bold", // Make text bold
              }}
              onClick={() => setShowHiGuest(!showHiGuest)} // Toggle dropdown
            >
              {user.name.split(" ").map((n) => n[0]).join("")} {/* Display initials */}
            </button>
            {showHiGuest && (
              <div
                style={{
                  position: "absolute",
                  top: "50px",
                  right: "0",
                  backgroundColor: "white",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  padding: "10px",
                  zIndex: 1000,
                }}
              >
                <p style={{ margin: "0", fontWeight: "bold" }}>{user.name}</p>
                <p style={{ margin: "0", fontSize: "14px", color: "#555" }}>{user.email}</p>
                <button
                  className="logout-btn"
                  onClick={logout}
                  style={{
                    marginTop: "10px",
                    padding: "5px 10px",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    width: "100%",
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            className="login-btn"
            onClick={openHiGuest}
            style={{
              cursor: "pointer",
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontWeight: "bold",
              fontSize: "14px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#0056b3"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#007bff"}
          >
            Login
          </button>
        )}
        {showHiGuest && !user && (
          <HiGuest
            onClose={closeHiGuest}
            openSignUp={() => {}}
            logout={logout} // Pass logout function to HiGuest
          />
        )}
      </div>
    </header>
  );
}

export default Header;
