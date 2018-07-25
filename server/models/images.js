const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  path: String,
  alt: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('images', ImageSchema);
