const orderStatusService = require("../services/orderStatus.service");

const controller = {
  getAll: async (req, res) => {
    const { data, status } = await orderStatusService.getAll(req.query);
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { data, status } = await orderStatusService.create(req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { data, status } = await orderStatusService.update(
      req.params.id,
      req.body
    );
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { data, status } = await orderStatusService.destroy(req.params.id);
    res.status(status).json(data);
  },
};

module.exports = controller;
