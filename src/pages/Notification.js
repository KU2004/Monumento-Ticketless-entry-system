export const sendNotification = (message) => {
    // This is a placeholder for the notification logic
    // You can integrate with a notification library or API here
    
    // Check if the message is related to Google Pay
    if (message.includes("Google Pay")) {
        // Logic to send payment notification to Google Pay
        // This is a placeholder for the Google Pay notification logic
        // You can integrate with Google Pay API here
        sendGooglePayNotification(message);
    } else {
        alert(message);
    }
};

// Function to send notification using Google Pay API
const sendGooglePayNotification = (message) => {
    // Placeholder for Google Pay API integration
    // Replace this with actual API call to Google Pay
    console.log("Sending payment notification to Google Pay:", message);
};
