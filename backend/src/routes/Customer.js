const express = require('express');
const routers = express.Router();
const {CreateCustomer,GetCustomer} = require('../controllers/Customer')
routers.route('/').get(GetCustomer).post(CreateCustomer);
module.exports = routers;