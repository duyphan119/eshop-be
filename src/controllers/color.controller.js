const colorService = require("../services/color.service");

const controller = {
  getAll: async (req, res) => {
    const { data, status } = await colorService.getAll(req.query);
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { data, status } = await colorService.create(req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { data, status } = await colorService.update(req.params.id, req.body);
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { data, status } = await colorService.destroy(req.params.id);
    res.status(status).json(data);
  },
};

module.exports = controller;
