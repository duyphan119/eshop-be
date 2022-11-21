const cartItemService = require("../services/cartItem.service");

const controller = {
  create: async (req, res) => {
    const { data, status } = await cartItemService.create(req.user, req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { data, status } = await cartItemService.update(
      req.params.id,
      req.body
    );
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { data, status } = await cartItemService.destroy(req.params.id);
    res.status(status).json(data);
  },
};

module.exports = controller;
