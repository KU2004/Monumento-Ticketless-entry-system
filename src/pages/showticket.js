import React from "react";
import { useLocation } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react"; // FIX HERE
import './showticket.css';

const ShowTicket = () => {
  const location = useLocation();
  const { date, time, ticketDetails, totalPrice, totalTickets } = location.state || {};

  if (!date) {
    return <div>No ticket data found. Please book your ticket first.</div>;
  }

  const qrData = {
    date: `${date.day} ${date.date}`,
    time,
    ticketDetails,
    totalPrice,
    totalTickets
  };

  return (
    <div className="ticket-container">
      <h2>🎉 Your Ticket is Generated! 🎟️</h2>

      <div className="ticket-summary">
        <p><strong>Date:</strong> {date.day} {date.date}</p>
        <p><strong>Time Slot:</strong> {time}</p>
        <h4>Ticket Details:</h4>
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
            {ticketDetails.map((ticket, index) => (
              <tr key={index}>
                <td>{ticket.type}</td>
                <td>{ticket.quantity}</td>
                <td>₹{ticket.amount}</td>
                <td>₹{ticket.amount * ticket.quantity}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td colSpan="3"><strong>Total</strong></td>
              <td><strong>₹{totalPrice}</strong></td>
            </tr>
          </tbody>
        </table>
        <p><strong>Total Tickets:</strong> {totalTickets}</p>
      </div>

      <div className="qr-code">
        <h4>Scan QR Code at Entry:</h4>
        <QRCodeCanvas value={JSON.stringify(qrData)} size={200} />
      </div>
    </div>
  );
};

export default ShowTicket;
