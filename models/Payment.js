const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  paymentScreenshot: {
    type: String, // Base64 encoded image string
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Payment', paymentSchema);
