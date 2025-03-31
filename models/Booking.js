const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  ticketDetails: {
    type: Array,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  totalTickets: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Assuming you have a User model
    required: true
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
