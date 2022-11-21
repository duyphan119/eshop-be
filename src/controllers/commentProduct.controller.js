const commentProductService = require("../services/commentProduct.service");

const controller = {
  getAll: async (req, res) => {
    const { data, status } = await commentProductService.getAll(req.query);
    res.status(status).json(data);
  },
  getByProduct: async (req, res) => {
    const { data, status } = await commentProductService.getByProduct(
      req.query
    );
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { data, status } = await commentProductService.create(req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { data, status } = await commentProductService.update(
      req.params.id,
      req.body
    );
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { data, status } = await commentProductService.destroy(req.params.id);
    res.status(status).json(data);
  },
};

module.exports = controller;
