import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import { sendNotification } from './Notification';
import axios from 'axios'; // Import axios for making API requests
import './PaymentPage.css';

const PaymentPage = () => {
    const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds
    const [paymentScreenshot, setPaymentScreenshot] = useState(null); // State to store the uploaded screenshot
    const [showPreview, setShowPreview] = useState(false); // State to toggle preview
    const [uploading, setUploading] = useState(false); // State to handle upload loading
    const navigate = useNavigate();
    const location = useLocation();
    const bookingDetails = location.state;

    useEffect(() => {
        if (timeRemaining > 0) {
            const timer = setInterval(() => {
                setTimeRemaining(timeRemaining - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else {
            sendNotification('Payment time expired. Please try again.');
            navigate('/confirm-booking');
        }
    }, [timeRemaining, navigate]);

    // Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPaymentScreenshot(reader.result); // Set the screenshot as a base64 string
                setShowPreview(false); // Hide preview initially
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    // Toggle preview of the uploaded screenshot
    const handlePreviewClick = () => {
        setShowPreview((prev) => !prev);
    };

    // Handle upload of the screenshot to MongoDB
    const handleUploadPayment = async () => {
        if (!paymentScreenshot) {
            alert('Please select a payment screenshot first.');
            return;
        }

        try {
            setUploading(true); // Set uploading state to true

            // Prepare the payload to send to the backend
            const payload = {
                bookingId: bookingDetails.bookingId, // Include booking ID or other relevant details
                paymentScreenshot: paymentScreenshot, // Base64 encoded image
            };

            // Send the screenshot to the backend API
            const response = await axios.post('http://localhost:5000/upload-payment', payload);

            if (response.data.success) {
                alert('✅ Payment screenshot uploaded successfully!');
                // Redirect to the confirmation page or show a success message
                navigate('/showTicket', {
                    state: {
                        date: bookingDetails.date,
                        time: bookingDetails.time,
                        ticketDetails: bookingDetails.ticketDetails,
                        totalPrice: bookingDetails.totalPrice,
                        totalTickets: bookingDetails.totalTickets,
                    },
                });
            } else {
                alert('❌ Payment upload failed. Please try again.');
            }
        } catch (error) {
            console.error('Error uploading payment:', error);
            alert('❌ Payment upload failed. Please try again.');
        } finally {
            setUploading(false); // Reset uploading state
        }
    };

    return (
        <div className="payment-container">
            <h1>Processing Payment</h1>
            <div className="qr-container">
                <QRCodeCanvas
                    value={`upi://pay?pa=kunalgp2004@okaxis&pn=Your Name&am=${bookingDetails.totalPrice}&cu=INR`}
                    size={200} // Increased size
                />
                <p>Payment request has been sent to your UPI app. Approve before it times out! Please do not close this window, as it will impact your booking.</p>
            </div>
            <div className="time-remaining">
                <p>Time Remaining: {Math.floor(timeRemaining / 60)}:{('0' + (timeRemaining % 60)).slice(-2)}</p>
            </div>
            <ol>
                <li>Open the UPI app you chose to pay from</li>
                <li>Open the payment request from Monumento</li>
                <li>Pay and come back to complete your booking</li>
            </ol>

            {/* Upload Section */}
            <div className="upload-container">
                <h3>Upload Payment Screenshot</h3>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="upload-input"
                />

                {paymentScreenshot && (
                    <>
                        <button className="preview-btn" onClick={handlePreviewClick}>
                            {showPreview ? 'Hide Preview' : 'Preview Screenshot'}
                        </button>

                        {showPreview && (
                            <div className="screenshot-preview">
                                <img src={paymentScreenshot} alt="Payment Screenshot" />
                            </div>
                        )}

                        <button
                            className="upload-btn"
                            onClick={handleUploadPayment}
                            disabled={uploading}
                        >
                            {uploading ? 'Uploading...' : 'Upload Payment'}
                        </button>
                    </>
                )}
            </div>

            <p>In case if this page doesn't refresh automatically, please check your booking status in Your Orders/Stream Library under your Profile.</p>
        </div>
    );
};

export default PaymentPage;