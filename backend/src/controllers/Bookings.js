const booking = require('../models/Booking');
async function GetBooking(req,res) {
    try {
         const { salonId } = req.query;
    const filter = {};
    if (salonId) {
      filter.salonId = salonId;
    }
    console.log(filter)
    console.log("Query params received:", req.query);
        const Booking = await booking.find(filter).populate('customerId', 'name Image contact_no').populate('serviceId').exec();
        res.json(Booking);
    } catch (err) {
        console.error("Error retrieving salons:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
    
}
async function CreateBooking(req,res) {
    try {
        const newbooking = new booking(req.body);
        const saved = await newbooking.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: "Invalid data" });
    }
}
module.exports = {
    GetBooking,
    CreateBooking,
}