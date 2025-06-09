const admin = require('../models/Admin');
const bcrypt = require('bcrypt')
async function GetAdmin(req,res) {
    try {
        const Admin = await admin.find();
        res.json(Admin);
    } catch (err) {
        console.error("Error retrieving salons:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
    
}
async function CreateAdmin(req,res) {
    try {
        const newadmin = new admin(req.body);
        const saved = await newadmin.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: "Invalid data" });
    }
}
async function UpdateAdmin(req, res) {
    // const { id } = req.params;
    const { password, name, contact_no,image } = req.body;
     console.log("Received data:", req.body)

    try {
        const foundAdmin = await admin.findOne(); 
        if (!foundAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        if (password) {
            foundAdmin.password = password; 
        }
        if (name) {
            foundAdmin.name = name;
        }
        if (contact_no) {
            foundAdmin.contact_no = contact_no;
        }
        if(image){
            foundAdmin.image = image;
        }
        console.log("Admin before save:", foundAdmin);
        await foundAdmin.save();
        console.log("Admin before save:", foundAdmin);

        return res.status(200).json({ message: 'Admin updated successfully', admin: foundAdmin });
    } catch (err) {
        console.error("Update error:", err.message);
        res.status(500).json({ error: "Failed to update admin" });
    }
}
async function VerifyPassword(req, res) {
    // const { id } = req.params;
    const { currentPassword} = req.body;
     console.log("Received data:", req.body)

    try {
        const foundAdmin = await admin.findOne(); 
        if (!foundAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        console.log("Stored hash:", foundAdmin.password)
        const match = await bcrypt.compare(currentPassword, foundAdmin.password)
        if(!match){
            return res.status(401).json({message:'Incorrect Password'})
        }
        
        await foundAdmin.save();

        return res.status(200).json({ message: 'Correct Password'});
    } catch (err) {
        console.error("Update error:", err.message);
        res.status(500).json({ error: "Failed to update admin" });
    }
}
    
module.exports = {
    GetAdmin,
    CreateAdmin,
    UpdateAdmin,
    VerifyPassword
}