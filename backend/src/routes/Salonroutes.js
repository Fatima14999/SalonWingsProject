const express = require('express');
const router = express.Router();
const {GetAllUser,CreateSalon} = require('../controllers/SalonM')
// router.get("/Salon",GetAllUser)
router.route('/').get(GetAllUser).post(CreateSalon);
router.get('/:id', GetAllUser);
module.exports = router;