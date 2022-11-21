const sizeService = require("../services/size.service");

const controller = {
  getAll: async (req, res) => {
    const { data, status } = await sizeService.getAll(req.query);
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { data, status } = await sizeService.create(req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { data, status } = await sizeService.update(req.params.id, req.body);
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { data, status } = await sizeService.destroy(req.params.id);
    res.status(status).json(data);
  },
};

module.exports = controller;
