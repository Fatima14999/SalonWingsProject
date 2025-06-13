const express = require('express');
const routers = express.Router();
const {CreateBooking,GetBooking} = require('../controllers/Bookings')
routers.route('/').get(GetBooking).post(CreateBooking);
module.exports = routers;