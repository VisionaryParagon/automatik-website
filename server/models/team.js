const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  pseudoname: String,
  title: String,
  department: String,
  seniority: Date,
  bio: String,
  primary_image: String,
  secondary_image: String
});

module.exports = mongoose.model('teammates', TeamSchema);
