const productUserService = require("../services/productUser.service");

const controller = {
  getByUser: async (req, res) => {
    const { data, status } = await productUserService.getByUser(req.query);
    res.status(status).json(data);
  },
  getByProduct: async (req, res) => {
    const { data, status } = await productUserService.getByProduct(req.query);
    res.status(status).json(data);
  },
  destroyByProductAndUser: async (req, res) => {
    const { data, status } = await productUserService.destroyByProductAndUser(
      req.query
    );
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { data, status } = await productUserService.create(req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { data, status } = await productUserService.update(
      req.params.id,
      req.body
    );
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { data, status } = await productUserService.destroy(req.params.id);
    res.status(status).json(data);
  },
};

module.exports = controller;
