const ServiceCategory = require('../models/ServiceCategory');
const ServiceType = require('../models/ServiceType');

const createCategory = async (req, res) => {
  try {
    const category = new ServiceCategory(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const createServiceType = async (req, res) => {
  try {
    const service = new ServiceType(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const getServicesBySalon = async (req, res) => {
  try {
    const { salonId } = req.query;
    const services = await ServiceType.find({ salonId }).populate('category', 'name');
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createCategory,
  createServiceType,
  getServicesBySalon
};
