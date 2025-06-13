const mongoose = require('mongoose');
const CustomerSchema = new mongoose.Schema({
     name: String,
     email: String,
     password:String,
     contact_no: Number, 
     Image: String,
});
const customer = mongoose.model('customer', CustomerSchema);
module.exports = customer;