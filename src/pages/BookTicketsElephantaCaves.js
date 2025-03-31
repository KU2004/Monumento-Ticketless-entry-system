import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "./Header";
import './BookTicketsElephantaCaves.css';


const TicketBooking = () => {
  const [userId, setUserId] = useState("");
  


useEffect(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user._id) {
    setUserId(user._id);
  }
}, []);

  const navigate = useNavigate();
  
  const handleConfirmBooking = async () => {
    const ticketDetails = selectedPrice.map(price => {
      const [type, amount] = price.split(": INR ");
      const quantity = ticketQuantities[price] || 0;
      return { type, amount: parseInt(amount), quantity };
    });
  
    const totalTickets = selectedPrice.reduce((total, price) => {
      return total + (ticketQuantities[price] || 0);
    }, 0);
  
    const totalPrice = selectedPrice.reduce((total, price) => {
      const [type, amount] = price.split(": INR ");
      const quantity = ticketQuantities[price] || 0;
      return total + parseInt(amount) * quantity;
    }, 0);
  
    try {
      const response = await fetch('http://localhost:5000/confirm-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: selectedDate.date,
          time: selectedTimeSlot,
          ticketDetails: ticketDetails,
          totalPrice: totalPrice,
          totalTickets: totalTickets,
          userId: userId,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert('Booking confirmed! Your Booking ID: ' + data.bookingId);
        navigate('/confirm-booking', {
          state: {
            date: selectedDate,
            time: selectedTimeSlot,
            ticketDetails: ticketDetails,
            totalPrice: totalPrice,
            totalTickets: totalTickets
          }
        });
  
      } else {
        const errorData = await response.json();
        console.error('Booking error:', errorData);
        alert('Please Login before Confirm Booking.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Booking confirmation failed. Please try again.');
    }
  };
  
  

  const [selectedDate, setSelectedDate] = useState({ day: "Thu", date: "13 MAR" });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [ticketQuantities, setTicketQuantities] = useState({
    "Indian: INR 40 per head": 0,
    "Foreigner: INR 600 per head": 0,
    "Children (5-15 years): INR 35": 0,
  });
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [sessionExpired, setSessionExpired] = useState(false);
  const [remainingSlots, setRemainingSlots] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          setSessionExpired(true);
          return 0;
        }
      });
    }, 1000);

    if (timeLeft <= 120) {
      document.querySelector(".timer").classList.add("low-time");
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const dates = [
    { day: "Thu", date: "13 MAR" },
    { day: "Fri", date: "14 MAR" },
    { day: "Sat", date: "15 MAR" },
    { day: "Sun", date: "16 MAR" },
    { day: "Mon", date: "17 MAR" },
    { day: "Tue", date: "18 MAR" },
    { day: "Wed", date: "19 MAR" },
    { day: "Thu", date: "20 MAR" },
  ];

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
    "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
    "05:00 PM", "05:30 PM"
  ];

  const nextStep = () => {
    if (!sessionExpired) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const prevStep = () => {
    if (!sessionExpired) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const togglePriceModal = () => {
    setIsPriceModalOpen(!isPriceModalOpen);
  };

  const handleTicketSelection = (e) => {
    const { value, checked } = e.target;
    setSelectedPrice((prevSelectedPrice) =>
      checked ? [...prevSelectedPrice, value] : prevSelectedPrice.filter((price) => price !== value)
    );
  };

  const handleQuantityChange = (e, ticketType) => {
    const { value } = e.target;
    if (selectedPrice.includes(ticketType)) {
      setTicketQuantities((prevQuantities) => ({
        ...prevQuantities,
        [ticketType]: value,
      }));
    }
  };

  useEffect(() => {
    document.addEventListener("DOMContentLoaded", function() {
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      const nextButton = document.querySelector('#nextButton');
    
      function updateButtonState() {
        nextButton.disabled = !Array.from(checkboxes).some(cb => cb.checked);
      }
    
      checkboxes.forEach(cb => cb.addEventListener('change', updateButtonState));
      updateButtonState();
    });
  }, []);

  useEffect(() => {
    document.querySelectorAll(".disabled-date").forEach(date => {
      date.title = "This date is not available.";
    });
  }, []);

  useEffect(() => {
    function checkNextButton() {
      let dateSelected = document.querySelector(".date.selected");
      let timeSelected = document.querySelector(".time-slot.selected");
      let nextButton = document.getElementById("next-btn");
    
      if (nextButton) {
        if (dateSelected && timeSelected) {
          nextButton.disabled = false;
          nextButton.style.opacity = "1";
        } else {
          nextButton.disabled = true;
          nextButton.style.opacity = "0.5";
        }
      }
    }
    
    document.querySelectorAll(".date, .time-slot").forEach(item => {
      item.addEventListener("click", checkNextButton);
    });
  }, []);

  const getRemainingSlots = (date, timeSlot) => {
    // Replace this with your actual logic to get remaining slots
    return Math.floor(10); // Random number between 1 and 10
  };

  useEffect(() => {
    if (selectedDate && selectedTimeSlot) {
      const slots = getRemainingSlots(selectedDate, selectedTimeSlot);
      setRemainingSlots((prevSlots) => ({
        ...prevSlots,
        [`${selectedDate}-${selectedTimeSlot}`]: slots,
      }));
    }
  }, [selectedDate, selectedTimeSlot]);

  return (
    <div>
      <Header />
      <div className="container">
        <div className="hero-image"></div>
        <div class="breadcrumb">
          <span className={currentStep === 1 ? "current-step" : ""} onClick={() => setCurrentStep(1)}>Step 1</span> &gt;
          <span className={currentStep === 2 ? "current-step" : ""} onClick={() => setCurrentStep(2)}>Step 2</span> &gt;
          <span className={currentStep === 3 ? "current-step" : ""} onClick={() => setCurrentStep(3)}>Step 3</span>
        </div>
        <div class="progress-bar">
          <div class="progress" style={{ width: `${(currentStep / 3) * 100}%` }}></div>
        </div>
        <h2 className="main-title">
          ELEPHANTA CAVES - TICKET BOOKING
        </h2>
        <p className="timer">⏳ Time Left: <span id="countdown">{formatTime(timeLeft)}</span></p>

        {sessionExpired && (
          <div className="session-expired">
            <p>Your session has expired. Please start over.</p>
            <button className="action-btn" onClick={() => window.location.reload()}>Start Over</button>
          </div>
        )}

        {!sessionExpired && (
          <div className="step-container">
            {currentStep === 1 && (
              <div className="step active">
                <span className="plan-visit">📅 Plan Your Visit: Pick a Date & Time!</span>
                <div className="date-time-container">
                  <div className="date-selector">
                    {dates.map((item) => (
                      <button
                        key={item.date}
                        className={`date-button ${selectedDate.date === item.date ? "selected" : ""}`}
                        onClick={() => setSelectedDate({ day: item.day, date: item.date })}
                      >
                        <span className="title">{item.day}</span>
                        <span className="day">{item.date.split(" ")[0]}</span>
                        <span className="date">{item.date.split(" ")[1]}</span>
                      </button>
                    ))}
                  </div>
                  <h3>Select Your Time Slot:</h3>
                  <div className="time-slot-container">
                    <div className="time-grid">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          className={`time-slot-button ${selectedTimeSlot === slot ? "selected" : ""}`}
                          onClick={() => setSelectedTimeSlot(slot)}
                        >
                          {slot}
                          {selectedDate && (
                            <div className={`remaining-slots ${selectedTimeSlot === slot ? "selected" : ""}`}>
                              Slots left: {remainingSlots[`${selectedDate}-${slot}`] || ""}
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <button className="action-btn" onClick={nextStep}>Next</button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="step active">
                <h3>🧐 Choose Your Ticket Type</h3>
                <p>Please select the ticket type based on your category before proceeding.</p>
                <div className="price-options">
                  <div className="ticket-option">
                    <input
                      type="checkbox"
                      id="indian"
                      name="ticket"
                      value="Indian: INR 40 per head"
                      checked={selectedPrice.includes("Indian: INR 40 per head")}
                      onChange={(e) => handleTicketSelection(e)}
                    />
                    <label htmlFor="indian">
                     🧑‍🤝‍🧑 Indian Recommended ₹40 per head
                    </label>
                    <div className="quantity-selector">
                      <button className="minus" onClick={() => handleQuantityChange({ target: { value: Math.max((ticketQuantities["Indian: INR 40 per head"] || 0) - 1, 0) } }, "Indian: INR 40 per head")}>−</button>
                      <input
                        type="number"
                        min="0"
                        value={ticketQuantities["Indian: INR 40 per head"] || 0}
                        className="ticket-qty"
                        onChange={(e) => handleQuantityChange(e, "Indian: INR 40 per head")}
                      />
                      <button className="plus" onClick={() => handleQuantityChange({ target: { value: (ticketQuantities["Indian: INR 40 per head"] || 0) + 1 } }, "Indian: INR 40 per head")}>+</button>
                    </div>
                  </div>
                  <div className="ticket-option">
                    <input
                      type="checkbox"
                      id="foreigner"
                      name="ticket"
                      value="Foreigner: INR 600 per head"
                      checked={selectedPrice.includes("Foreigner: INR 600 per head")}
                      onChange={(e) => handleTicketSelection(e)}
                    />
                    <label htmlFor="foreigner">
                      🌍 Foreigner (Best Value) ₹600 per head
                    </label>
                    <div className="quantity-selector">
                      <button className="minus" onClick={() => handleQuantityChange({ target: { value: Math.max((ticketQuantities["Foreigner: INR 600 per head"] || 0) - 1, 0) } }, "Foreigner: INR 600 per head")}>−</button>
                      <input
                        type="number"
                        min="0"
                        value={ticketQuantities["Foreigner: INR 600 per head"] || 0}
                        className="ticket-qty"
                        onChange={(e) => handleQuantityChange(e, "Foreigner: INR 600 per head")}
                      />
                      <button className="plus" onClick={() => handleQuantityChange({ target: { value: (ticketQuantities["Foreigner: INR 600 per head"] || 0) + 1 } }, "Foreigner: INR 600 per head")}>+</button>
                    </div>
                  </div>
                  <div className="ticket-option">
                    <input
                      type="checkbox"
                      id="children"
                      name="ticket"
                      value="Children (5-15 years): INR 35"
                      checked={selectedPrice.includes("Children (5-15 years): INR 35")}
                      onChange={(e) => handleTicketSelection(e)}
                    />
                    <label htmlFor="children">
                      👦 Children (5-15Yrs) (Discounted) ₹35 per head
                    </label>
                    <div className="quantity-selector">
                      <button className="minus" onClick={() => handleQuantityChange({ target: { value: Math.max((ticketQuantities["Children (5-15 years): INR 35"] || 0) - 1, 0) } }, "Children (5-15 years): INR 35")}>−</button>
                      <input
                        type="number"
                        min="0"
                        value={ticketQuantities["Children (5-15 years): INR 35"] || 0}
                        className="ticket-qty"
                        onChange={(e) => handleQuantityChange(e, "Children (5-15 years): INR 35")}
                      />
                      <button className="plus" onClick={() => handleQuantityChange({ target: { value: (ticketQuantities["Children (5-15 years): INR 35"] || 0) + 1 } }, "Children (5-15 years): INR 35")}>+</button>
                    </div>
                  </div>
                </div>
                <div className="button-group">
                  <button className="action-btn" onClick={prevStep}>Back</button>
                  <button className="action-btn" id="nextButton" onClick={nextStep}>Next</button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="step active">
                <div className="summary-container">
                  <h3>Summary</h3>
                  <p1>📅 <strong>Date:</strong> {selectedDate.date} {selectedDate.day}</p1> <br />
                  <p1>⏰ <strong>Time:</strong> {selectedTimeSlot}</p1> <br />
                  <h4>Ticket Pricing:</h4>
                  <table>
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Price per Head</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedPrice.map((price) => {
                        const [type, amount] = price.split(": INR ");
                        const quantity = ticketQuantities[price] || 0;
                        return (
                          <tr key={price}>
                            <td>{type}</td>
                            <td>{quantity}</td>
                            <td>₹{amount}</td>
                            <td className="price">₹{parseInt(amount) * quantity}</td>
                          </tr>
                        );
                      })}
                      <tr className="total-row">
                        <td colSpan="3"><strong>Total</strong></td>
                        <td className="price"><strong>₹{selectedPrice.reduce((total, price) => {
                          const [type, amount] = price.split(": INR ");
                          const quantity = ticketQuantities[price] || 0;
                          return total + parseInt(amount) * quantity;
                        }, 0)}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="total-tickets">🎟️ <strong>Total Tickets:</strong> {selectedPrice.reduce((total, price) => {
                    return total + (ticketQuantities[price] || 0);
                  }, 0)}</p>
                  <p className="total-amount">💰 <strong>Total Amount:</strong> ₹{selectedPrice.reduce((total, price) => {
                    const [type, amount] = price.split(": INR ");
                    const quantity = ticketQuantities[price] || 0;
                    return total + parseInt(amount) * quantity;
                  }, 0)}</p>
                  <p className="ticket-breakdown">Breakdown: {selectedPrice.map(price => `${ticketQuantities[price] || 0}`).join(' + ')} = {selectedPrice.reduce((total, price) => {
                    return total + (ticketQuantities[price] || 0);
                  }, 0)} Tickets</p>
                </div>
                <div className="divider"></div>
                <div className="button-group">
                  <button className="action-btn" onClick={prevStep}>Back</button>
                  <button className="action-btn confirm-btn" onClick={handleConfirmBooking}>Confirm Booking</button>
                </div>
              </div>
            )}
          </div>
        )}

        {isPriceModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={togglePriceModal}>&times;</span>
              <h2>Ticket Prices</h2>
              <div className={`ticket-option ${selectedPrice.includes("Indian: INR 40 per head") ? "selected" : ""}`}>
                <input
                  type="checkbox"
                  name="price"
                  value="Indian: INR 40 per head"
                  checked={selectedPrice.includes("Indian: INR 40 per head")}
                  onChange={handleTicketSelection}
                />
                🇮🇳 Indian <span className="recommended">Recommended</span> <br />
                <span className="price">₹40 per head</span>
                {selectedPrice.includes("Indian: INR 40 per head") && (
                  <div className="quantity-selector">
                    <button className="minus" onClick={() => handleQuantityChange({ target: { value: Math.max((ticketQuantities["Indian: INR 40 per head"] || 0) - 1, 0) } }, "Indian: INR 40 per head")}>−</button>
                    <input
                      type="number"
                      min="0"
                      value={ticketQuantities["Indian: INR 40 per head"] || 0}
                      className="ticket-qty"
                      onChange={(e) => handleQuantityChange(e, "Indian: INR 40 per head")}
                    />
                    <button className="plus" onClick={() => handleQuantityChange({ target: { value: (ticketQuantities["Indian: INR 40 per head"] || 0) + 1 } }, "Indian: INR 40 per head")}>+</button>
                  </div>
                )}
              </div>
              <div className={`ticket-option ${selectedPrice.includes("Foreigner: INR 600 per head") ? "selected" : ""}`}>
                <input
                  type="checkbox"
                  name="price"
                  value="Foreigner: INR 600 per head"
                  checked={selectedPrice.includes("Foreigner: INR 600 per head")}
                  onChange={handleTicketSelection}
                />
                🌍 Foreigner <br /> ₹600 per head
                {selectedPrice.includes("Foreigner: INR 600 per head") && (
                  <div className="quantity-selector">
                    <button className="minus" onClick={() => handleQuantityChange({ target: { value: Math.max((ticketQuantities["Foreigner: INR 600 per head"] || 0) - 1, 0) } }, "Foreigner: INR 600 per head")}>−</button>
                    <input
                      type="number"
                      min="0"
                      value={ticketQuantities["Foreigner: INR 600 per head"] || 0}
                      className="ticket-qty"
                      onChange={(e) => handleQuantityChange(e, "Foreigner: INR 600 per head")}
                    />
                    <button className="plus" onClick={() => handleQuantityChange({ target: { value: (ticketQuantities["Foreigner: INR 600 per head"] || 0) + 1 } }, "Foreigner: INR 600 per head")}>+</button>
                  </div>
                )}
              </div>
              <div className={`ticket-option ${selectedPrice.includes("Children (5-15 years): INR 35 per head") ? "selected" : ""}`}>
                <input
                  type="checkbox"
                  name="price"
                  value="Children (5-15 years): INR 35 per head"
                  checked={selectedPrice.includes("Children (5-15 years): INR 35 per head")}
                  onChange={handleTicketSelection}
                />
                👦 Children (5-15) <br /> ₹35 per head
                {selectedPrice.includes("Children (5-15 years): INR 35 per head") && (
                  <div className="quantity-selector">
                    <button className="minus" onClick={() => handleQuantityChange({ target: { value: Math.max((ticketQuantities["Children (5-15 years): INR 35 per head"] || 0) - 1, 0) } }, "Children (5-15 years): INR 35 per head")}>−</button>
                    <input
                      type="number"
                      min="0"
                      value={ticketQuantities["Children (5-15 years): INR 35 per head"] || 0}
                      className="ticket-qty"
                      onChange={(e) => handleQuantityChange(e, "Children (5-15 years): INR 35 per head")}
                    />
                    <button className="plus" onClick={() => handleQuantityChange({ target: { value: (ticketQuantities["Children (5-15 years): INR 35 per head"] || 0) + 1 } }, "Children (5-15 years): INR 35 per head")}>+</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketBooking;
