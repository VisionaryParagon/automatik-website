const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
  name: String,
  rank: Number
});

module.exports = mongoose.model('departments', DepartmentSchema);
