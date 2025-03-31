import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ConfirmbookElephanataCaves.css';

const ConfirmbookElephanataCaves = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingDetails = location.state;

  const [email, setEmail] = useState('kunalgp2004@gmail.com');
  const [mobileNumber, setMobileNumber] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [isContinueEnabled, setIsContinueEnabled] = useState(false);

  if (!bookingDetails) {
    return <div>Error: Booking details not found.</div>;
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    setMobileNumber(value);
    setIsContinueEnabled(/^\d{10}$/.test(value));
  };

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.value);
  };

  const handleContinueClick = () => {
    alert(`Email: ${email}\nMobile Number: ${mobileNumber}`);
  };

  const handlePaymentClick = () => {
    if (selectedPayment) {
      alert(`Payment initiated via ${selectedPayment}`);
      navigate('/payment', { state: bookingDetails });
    }
  };

  return (
    <div className="payment-container">
      {/* Summary Section */}
      <div className="section">
        <h3 className="section-header">Order Summary</h3>
        <div className="summary-card">
          <p><strong>Date & Time:</strong> {bookingDetails.date.date} {bookingDetails.date.day}, {bookingDetails.time}</p>
          <table className="summary-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price per Head</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {bookingDetails.ticketDetails.map((ticket, index) => {
                const amount = ticket.amount; // It's already a number

                return (
                  <tr key={index}>
                    <td>{ticket.type}</td>
                    <td>{ticket.quantity}</td>
                    <td>₹{ticket.amount}</td>
                    <td>₹{amount * ticket.quantity}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3"><strong>Total Tickets</strong></td>
                <td>{bookingDetails.totalTickets}</td>
              </tr>
              <tr>
                <td colSpan="3"><strong>Total Amount</strong></td>
                <td>₹{bookingDetails.totalPrice}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Contact Section */}
      <div className="section">
        <h3 className="section-header">Share your Contact Details</h3>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Mobile Number"
          value={mobileNumber}
          onChange={handleMobileChange}
          className="input-field"
        />
        <button
          className={`action-button ${!isContinueEnabled ? 'disabled' : ''}`}
          onClick={handleContinueClick}
          disabled={!isContinueEnabled}
        >
          CONTINUE
        </button>
      </div>

      {/* Payment Options */}
      <div className="section">
        <h3 className="section-header">Payment Options</h3>
        <div className="payment-method">
          <input
            type="radio"
            name="payment"
            value="Google Pay"
            checked={selectedPayment === 'Google Pay'}
            onChange={handlePaymentChange}
          />
          <label>Google Pay</label>
          {selectedPayment === 'Google Pay' && (
            <div className="payment-details">
              <input
                type="text"
                placeholder="Enter mobile number"
                value={mobileNumber}
                onChange={handleMobileChange}
                className="input-field"
              />
              <button
                className="action-button"
                onClick={handlePaymentClick}
              >
                MAKE PAYMENT
              </button>
              {/* Remove QRCodeCanvas */}
            </div>
          )}
        </div>
        {/* Add other payment options similarly */}
      </div>
    </div>
  );
};

export default ConfirmbookElephanataCaves;
