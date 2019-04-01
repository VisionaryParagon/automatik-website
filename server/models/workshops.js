const mongoose = require('mongoose');

const WorkshopsSchema = new mongoose.Schema({
  title: String,
  meta_title: String,
  description: String,
  slug: String,
  description: String,
  keywords: String,
  logo: String,
  title_image_lg: String,
  title_image_md: String,
  title_image_sm: String,
  color: String,
  order: Number,
  subhead: String,
  highlights: Array,
  quotes: Array
});

const WorkshopEventsSchema = new mongoose.Schema({
  workshop: String,
  price: Number,
  start_date: Date,
  end_date: Date,
  location: Object,
  schedule: Array
});

const WorkshopRegistrantsSchema = new mongoose.Schema({
  email: String,
  first_name: String,
  last_name: String,
  address: String,
  address_2: String,
  city: String,
  state: String,
  zip: String,
  workshop: String,
  workshop_date: Date,
  price: Number,
  charge_id: String,
  reg_status: String,
  pmt_status: String,
  enrolled: Date,
  modified: Date
});

module.exports = mongoose.model('workshops', WorkshopsSchema);
module.exports = mongoose.model('workshop-events', WorkshopEventsSchema);
module.exports = mongoose.model('workshop-registrants', WorkshopRegistrantsSchema);