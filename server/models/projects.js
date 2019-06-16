const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  title: String,
  meta_title: String,
  slug: String,
  description: String,
  keywords: String,
  category: String,
  date: Date,
  title_image_lg: String,
  title_image_md: String,
  title_image_sm: String,
  headline: String,
  logo: String,
  copy: String,
  featured_image: String,
  highlights: Array,
  images: Array
});

module.exports = mongoose.model('projects', PortfolioSchema);
