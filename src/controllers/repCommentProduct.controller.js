const repCommentProductService = require("../services/repCommentProduct.service");

const controller = {
  getAll: async (req, res) => {
    const { data, status } = await repCommentProductService.getAll(req.query);
    res.status(status).json(data);
  },
  getByProduct: async (req, res) => {
    const { data, status } = await repCommentProductService.getByProduct(
      req.query
    );
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { data, status } = await repCommentProductService.create(req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { data, status } = await repCommentProductService.update(
      req.params.id,
      req.body
    );
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { data, status } = await repCommentProductService.destroy(
      req.params.id
    );
    res.status(status).json(data);
  },
};

module.exports = controller;
