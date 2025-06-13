const mongoose = require('mongoose');

const ServiceCategorySchema = new mongoose.Schema({
  name:  String
});

module.exports = mongoose.model('ServiceCategory', ServiceCategorySchema);