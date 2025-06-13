const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const SalonOwnerSchema = new mongoose.Schema({
    Username: String,
    email:String,
    password:String,
    contactno: String,
    cnicImage: [String],
    cnic_no: String,
    salonId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Salon' }],
    Image: String
});
SalonOwnerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
const SalonOwner = mongoose.model('SalonOwner', SalonOwnerSchema);
module.exports = SalonOwner;