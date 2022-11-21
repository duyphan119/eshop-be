const productImageService = require("../services/productImage.service");

const controller = {
  getAll: async (req, res) => {
    const { data, status } = await productImageService.getAll(req.query);
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { data, status } = await productImageService.create(req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { data, status } = await productImageService.update(
      req.params.id,
      req.body
    );
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { data, status } = await productImageService.destroy(req.params.id);
    res.status(status).json(data);
  },
  destroyMany: async (req, res) => {
    const { data, status } = await productImageService.destroyMany(req.body);
    res.status(status).json(data);
  },
};

module.exports = controller;
