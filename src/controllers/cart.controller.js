const cartService = require("../services/cart.service");

const controller = {
  getByUser: async (req, res) => {
    const { data, status } = await cartService.getByUser(req.params.userId);
    res.status(status).json(data);
  },
};

module.exports = controller;
