const mongoose = require('mongoose');
const BookingSchema = new mongoose.Schema({
    // _id: ObjectId,
    // customerId: ObjectId
    // ,
    customerId:{type: mongoose.Schema.Types.ObjectId,
    ref: 'customer'},
    salonId:{type: mongoose.Schema.Types.ObjectId, ref: 'Salon' },
    // servicesId: ObjectId,
    serviceId:[{type: mongoose.Schema.Types.ObjectId, ref: 'ServiceType' }],
    date: String,
    time: String,
    status:String,
});
const booking = mongoose.model('booking', BookingSchema);
module.exports = booking;