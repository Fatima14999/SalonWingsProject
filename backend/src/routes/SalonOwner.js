const express = require('express');
const routers = express.Router();
const {CreateSalonOwner,GetSalonOwner} = require('../controllers/SalonOwner')
routers.route('/').get(GetSalonOwner).post(CreateSalonOwner);
module.exports = routers;