const productDetailService = require("../services/productDetail.service");

const controller = {
  getAll: async (req, res) => {
    const { data, status } = await productDetailService.getAll(req.query);
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { data, status } = await productDetailService.create(req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { data, status } = await productDetailService.update(
      req.params.id,
      req.body
    );
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { data, status } = await productDetailService.destroy(req.params.id);
    res.status(status).json(data);
  },
};

module.exports = controller;
