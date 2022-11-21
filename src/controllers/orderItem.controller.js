const orderItemService = require("../services/orderItem.service");

const controller = {
  getAll: async (req, res) => {
    const { data, status } = await orderItemService.getAll(req.query);
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { data, status } = await orderItemService.create(req.body, req.query);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { data, status } = await orderItemService.update(
      req.params.id,
      req.body
    );
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { data, status } = await orderItemService.destroy(req.params.id);
    res.status(status).json(data);
  },
};

module.exports = controller;
