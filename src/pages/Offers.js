import React from "react";
import { Link } from "react-router-dom";

function Offers() {
  return (
    <div>
      <h1>Offers Page</h1>
      <p>Find the best offers and discounts for monument visits.</p>

      {/* ✅ Back to Home Link */}
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default Offers;
