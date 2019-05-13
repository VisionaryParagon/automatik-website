const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  url: String,
  title: String,
  description: String,
  image: String,
  date: Date,
  source: String
});

module.exports = mongoose.model('news-articles', NewsSchema);
