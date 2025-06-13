const Salon = require('../models/Salon')
async function GetAllUser(req,res) {
    try {
        const { id } = req.params;

    if (id) {
      const salon = await Salon.findById(id).populate('salonOwnerId','Username cnic_no Image cnicImage').exec();
      if (!salon) {
        return res.status(404).json({ error: 'Salon not found' });
      }
      return res.json(salon);
    }
        const salons = await Salon.find().populate('salonOwnerId','name cnic_no').exec();
        res.json(salons);
    } catch (err) {
        console.error("Error retrieving salons:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
    
}
async function CreateSalon(req,res) {
    {
        try
        {const salon = new Salon(req.body);
        const saved = await salon.save();
    res.status(201).json(saved);
    }
    catch(error){
        res.status(400).json({ error: "Invalid data" });
    }
    }
    
}
module.exports = {
 GetAllUser,
 CreateSalon
}