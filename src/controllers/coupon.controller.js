const couponService = require("../services/coupon.service");

const controller = {
  getAll: async (req, res) => {
    const { data, status } = await couponService.getAll(req.query);
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { data, status } = await couponService.create(req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { data, status } = await couponService.update(
      req.params.id,
      req.body
    );
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { data, status } = await couponService.destroy(req.params.id);
    res.status(status).json(data);
  },
};

module.exports = controller;
