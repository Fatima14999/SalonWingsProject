const mongoose = require('mongoose');
const ServicesTypeSchema = new mongoose.Schema({
    name: String,
    price:Number,
     category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceCategory',
    required: true
  },
  salonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'salon',
    required: true
  }
});
const ServicesType = mongoose.model('ServiceType',ServicesTypeSchema)
module.exports = ServicesType;