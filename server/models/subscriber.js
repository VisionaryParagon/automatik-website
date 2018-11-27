const mongoose = require('mongoose');

const SubscriberSchema = new mongoose.Schema({
  name: String,
  email_address: String,
  status: String,
  timestamp_signup: Date
});

module.exports = mongoose.model('subscriber', SubscriberSchema);
