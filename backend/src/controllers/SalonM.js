const Salon = require('../models/Salon')
async function GetAllUser(req,res) {
    try {
        const salons = await Salon.find();
        res.json(salons);
    } catch (err) {
        console.error("Error retrieving salons:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
    
}
module.exports = {
 GetAllUser,
}