const express = require('express');
const routers = express.Router();
const {GetAdmin, CreateAdmin,UpdateAdmin,VerifyPassword} = require('../controllers/Admin')
routers.route('/').get(GetAdmin).post(CreateAdmin).put(UpdateAdmin);
routers.post('/VerifyPassword',VerifyPassword)

module.exports = routers;