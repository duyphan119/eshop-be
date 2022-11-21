const orderService = require("../services/order.service");

const controller = {
  getAll: async (req, res) => {
    const { data, status } = await orderService.getAll(req.query);
    res.status(status).json(data);
  },
  getByUser: async (req, res) => {
    const { data, status } = await orderService.getByUser(
      req.query,
      req.params.userId
    );
    res.status(status).json(data);
  },
  getById: async (req, res) => {
    const { data, status } = await orderService.getById(
      req.query,
      req.params.id
    );
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { data, status } = await orderService.create(req.body, req.query);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { data, status } = await orderService.update(req.params.id, req.body);
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { data, status } = await orderService.destroy(
      req.user,
      req.params.id
    );
    res.status(status).json(data);
  },
};

module.exports = controller;
