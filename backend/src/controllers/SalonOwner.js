const SalonOwner = require('../models/SalonOwner');
async function GetSalonOwner(req,res) {
     try {
        const salonOwner = await SalonOwner.find().populate('salonId');
        res.json(salonOwner);
    } catch (err) {
        console.error("Error retrieving salons:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
    
}
async function CreateSalonOwner(req,res) {
    try {
        const newbooking = new SalonOwner(req.body);
        const saved = await newbooking.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: "Invalid data" });
    }
}
module.exports = {
    GetSalonOwner,
    CreateSalonOwner,
}