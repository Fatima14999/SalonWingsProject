const express = require('express');
const router = express.Router();
const {createCategory,createServiceType,getServicesBySalon} = require('../controllers/Services')
router.route('/').get(getServicesBySalon);
router.route('/SalonCategory').post(createCategory);
router.route('/SalonType').post(createServiceType)
module.exports = router;