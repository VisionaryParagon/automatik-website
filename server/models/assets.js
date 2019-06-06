const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema({
  path: String,
  type: String,
  alt: String,
  poster: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('assets', AssetSchema);
