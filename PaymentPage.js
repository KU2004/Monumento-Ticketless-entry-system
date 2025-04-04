import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import axios from 'axios'; // Import axios for making API requests
import './PaymentPage.css';

const PaymentPage = () => {
    const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds
    const [paymentScreenshot, setPaymentScreenshot] = useState(null); // State to store the uploaded screenshot
    const [showPreview, setShowPreview] = useState(false); // State to toggle preview
    const [uploading, setUploading] = useState(false); // State to handle upload loading
    const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
    const navigate = useNavigate();
    const location = useLocation();
    const bookingDetails = location.state;

    // Enhanced timer logic with confirmation dialog
    useEffect(() => {
        if (timeRemaining > 0) {
            const timer = setInterval(() => {
                setTimeRemaining((prev) => prev - 1); // Use functional update for better performance
            }, 1000);
            return () => clearInterval(timer);
        } else {
            if (window.confirm('⏳ Payment time expired. Do you want to try again?')) {
                navigate('/confirm-booking');
            } else {
                navigate('/home'); // Redirect to home if user cancels
            }
        }
    }, [timeRemaining, navigate]);

    // Enhanced error handling for file upload
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('⚠️ Please upload a valid image file.');
                return;
            }
            if (file.size > 5 * 1024 * 1024) { // Limit file size to 5MB
                alert('⚠️ File size exceeds 5MB. Please upload a smaller file.');
                return;
            }

            // If validation passes, read the file and set the state
            const reader = new FileReader();
            reader.onloadend = () => {
                setPaymentScreenshot(reader.result); // Set the screenshot state
                setShowPreview(true); // Automatically show preview after upload
            };
            reader.readAsDataURL(file);
        }
    };

    // Toggle preview popup
    const handlePreviewClick = () => {
        setShowPopup(true); // Open the popup
    };

    // Close the popup
    const handleClosePopup = () => {
        setShowPopup(false);
    };

    // Handle upload of the screenshot
    const handleUploadPayment = async () => {
        if (!paymentScreenshot) {
            alert('⚠️ Please select a payment screenshot first.');
            return;
        }

        try {
            setUploading(true);

            // Directly navigate to the ticket display page
            alert('✅ Payment screenshot uploaded successfully!');
            navigate('/showTicket', {
                state: {
                    date: bookingDetails.date,
                    time: bookingDetails.time,
                    ticketDetails: bookingDetails.ticketDetails,
                    totalPrice: bookingDetails.totalPrice,
                    totalTickets: bookingDetails.totalTickets,
                },
            });
        } catch (error) {
            console.error('Error uploading payment screenshot:', error);
            alert('❌ Payment upload failed. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div
            className="payment-container vertical"
            style={{
                width: '60%',
                height: 'auto', // Remove fixed height
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f9f9f9', // Light background for better contrast
                borderRadius: '15px', // Rounded corners
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
                padding: '20px', // Add padding for spacing
            }}
        >
            {/* Title Section */}
            <h1 className="animated-title" style={{ color: '#333', fontSize: '2rem', marginBottom: '20px' }}>
                PROCESSING PAYMENT
            </h1>
            
            {/* Timer Section */}
            <div className="time-remaining" style={{ marginBottom: '20px', fontSize: '1.2rem', color: '#555' }}>
                <p>Time Remaining: {`${Math.floor(timeRemaining / 60)}:${('0' + (timeRemaining % 60)).slice(-2)}`}</p>
            </div>
            
            {/* QR Code Section */}
            <div className="qr-container" style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <QRCodeCanvas
                    value={`upi://pay?pa=kunalgp2004@okaxis&pn=Your Name&am=${bookingDetails.totalPrice}&cu=INR`}
                    size={200}
                    style={{
                        border: '2px solid #ddd', // Add border around QR code
                        borderRadius: '10px', // Rounded corners for QR code
                        padding: '10px', // Add padding inside border
                        backgroundColor: '#fff', // White background for QR code
                    }}
                />
            </div>
            
            {/* Upload Section */}
            <div className="upload-container" style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h3 style={{ color: '#333', marginBottom: '10px' }}>Upload Payment Screenshot</h3>
                <p style={{ color: '#777', marginBottom: '15px' }}>Please upload a clear screenshot of your payment confirmation.</p>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="upload-input"
                    style={{
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        marginBottom: '15px',
                    }}
                />

                {paymentScreenshot && (
                    <>
                        <div className="button-container" style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                            <button
                                className="new-btn small-btn"
                                onClick={handlePreviewClick}
                                style={{
                                    backgroundColor: '#007bff',
                                    color: '#fff',
                                    padding: '10px 20px',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s',
                                }}
                                onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
                                onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
                            >
                                Preview Screenshot
                            </button>
                            <button
                                className="new-btn small-btn"
                                onClick={handleUploadPayment}
                                disabled={uploading}
                                style={{
                                    backgroundColor: uploading ? '#ccc' : '#28a745',
                                    color: '#fff',
                                    padding: '10px 20px',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: uploading ? 'not-allowed' : 'pointer',
                                    transition: 'background-color 0.3s',
                                }}
                                onMouseOver={(e) => !uploading && (e.target.style.backgroundColor = '#218838')}
                                onMouseOut={(e) => !uploading && (e.target.style.backgroundColor = '#28a745')}
                            >
                                {uploading ? 'Uploading...' : 'Upload Payment'}
                            </button>
                        </div>

                        {showPopup && (
                            <div
                                className="popup-overlay"
                                style={{
                                    position: 'fixed',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    zIndex: 1000,
                                }}
                                onClick={handleClosePopup}
                            >
                                <div
                                    className="popup-content"
                                    style={{
                                        position: 'relative',
                                        backgroundColor: '#fff',
                                        padding: '20px',
                                        borderRadius: '10px',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                        maxWidth: '90%',
                                        maxHeight: '90%',
                                        overflow: 'auto',
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <img
                                        src={paymentScreenshot}
                                        alt="Payment Screenshot"
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '80vh',
                                            borderRadius: '10px',
                                        }}
                                    />
                                    <button
                                        className="new-btn small-btn"
                                        style={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            width: '30px',
                                            height: '30px',
                                            fontSize: '14px',
                                            padding: '0',
                                            lineHeight: '30px',
                                            backgroundColor: '#ff5722',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '50%',
                                            cursor: 'pointer',
                                        }}
                                        onClick={handleClosePopup}
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default PaymentPage;