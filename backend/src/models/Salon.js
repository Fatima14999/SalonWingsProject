const mongoose = require('mongoose');
const SalonSchema = new mongoose.Schema({
    name: String,
    location: String,
    contactno: String,
    rating: Number,
});
const Salon = mongoose.model('Salon', SalonSchema);
module.exports = Salon;