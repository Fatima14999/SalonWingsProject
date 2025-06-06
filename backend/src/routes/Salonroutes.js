const express = require('express');
const router = express.Router();
const {GetAllUser} = require('../controllers/SalonM')
// router.get("/Salon",GetAllUser)
router.route('/').get(GetAllUser);
module.exports = router;