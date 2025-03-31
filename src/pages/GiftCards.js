import React from "react";
import { Link } from "react-router-dom";

function GiftCards() {
  return (
    <div>
      <h1>Gift Cards Page</h1>
      <p>Buy and redeem gift cards for monument tours.</p>

      {/* ✅ Back to Home Link */}
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default GiftCards;
