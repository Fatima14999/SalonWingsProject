const mongoose = require('mongoose');
const SalonSchema = new mongoose.Schema({
    name: String,
    location: String,
    contactno: String,
    rating: Number,
    salonImage: [String],
    open_time: String,
    close_time: String,
    serviceId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ServiceType' }],
    salonOwnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'SalonOwner' },
    status: String
});
const Salon = mongoose.model('Salon', SalonSchema);
module.exports = Salon;