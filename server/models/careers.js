const mongoose = require('mongoose');

const CareersSchema = new mongoose.Schema({
  position: String,
  description: String,
  short_description: String
});

module.exports = mongoose.model('careers', CareersSchema);
