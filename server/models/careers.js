const mongoose = require('mongoose');

const CareersSchema = new mongoose.Schema({
  career: String,
  first_name: String,
  last_name: String,
  email: String,
  specialty: String,
  start_date: Date,
  status: String,
  awesome: String
});

module.exports = mongoose.model('career-inquiries', CareersSchema);
