const groupProductService = require("../services/groupProduct.service");

const controller = {
  getAll: async (req, res) => {
    const { data, status } = await groupProductService.getAll(req.query);
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { data, status } = await groupProductService.create(req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { data, status } = await groupProductService.update(
      req.params.id,
      req.body
    );
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { data, status } = await groupProductService.destroy(req.params.id);
    res.status(status).json(data);
  },
};

module.exports = controller;
