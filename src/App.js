import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Monuments from "./pages/Monuments";
import Forts from "./pages/Forts";
import Sanctuaries from "./pages/Sanctuaries";
import Temples from "./pages/Temples";
import Palaces from "./pages/Palaces";
import Caves from "./pages/Caves";
import Museums from "./pages/Museums";
import Maps from "./pages/Maps";
import Offers from "./pages/Offers";
import GiftCards from "./pages/GiftCards";
import HiGuest from "./components/HiGuest";
import SignIn from "./components/Sign in"; // Import the SignIn component
import GatewayOfIndia from "./pages/GatewayOfIndia";
import ElephantaCaves from "./pages/ElephantaCaves";
import BookTickets from "./pages/BookTicketsElephantaCaves";
import PaymentPage from "./pages/ConfirmbookElephanataCaves";
import PaymentPage1 from "./pages/PaymentPage";
import Chatbot from "./pages/chatbot";
import Mosque from "./pages/Mosque";
import ShowTicket from "./pages/showticket";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [language, setLanguage] = useState("en"); // Global language state

  const openLogin = () => {
    console.log("Opening login modal");
    setShowLogin(true);
  };

  const openSignUp = () => {
    console.log("Opening sign-up modal");
    setShowSignUp(true);
  };

  return (
    <LanguageProvider>
      <Router>
        <div>
          {/* Render HiGuest as a Modal */}
          {showLogin && <HiGuest onClose={() => setShowLogin(false)} openSignUp={openSignUp} />}
          {/* Render SignIn as a Modal */}
          {showSignUp && <SignIn onClose={() => setShowSignUp(false)} />}
          <Routes>
            <Route path="/monuments" element={<Monuments />} />
            <Route path="/forts" element={<Forts />} />
            <Route path="/sanctuaries" element={<Sanctuaries />} />
            <Route path="/temples" element={<Temples />} />
            <Route path="/palaces" element={<Palaces />} />
            <Route path="/caves" element={<Caves />} />
            <Route path="/museums" element={<Museums />} />
            <Route path="/maps" element={<Maps />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/gift-cards" element={<GiftCards />} />
            <Route path="/gateway-of-india" element={<GatewayOfIndia />} />
            <Route path="/" element={<Home openLogin={openLogin} language={language} setLanguage={setLanguage} />} />
            <Route path="/ElephantaCaves" element={<ElephantaCaves />} />
            <Route path="/book-tickets" element={<BookTickets />} />
            <Route path="/confirm-booking" element={<PaymentPage />} />
            <Route path="/payment" element={<PaymentPage1 />} />
            <Route path="/chatbot" element={<Chatbot language={language} setLanguage={setLanguage} />} />
            <Route path="/mosque" element={<Mosque />} />
            <Route path="/showticket" element={<ShowTicket />} />
            <Route path="/signup" element={<SignIn />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
