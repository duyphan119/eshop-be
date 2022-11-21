const categoryService = require("../services/category.service");

const controller = {
  getAll: async (req, res) => {
    const { data, status } = await categoryService.getAll(req.query);
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { data, status } = await categoryService.create(req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { data, status } = await categoryService.update(
      req.params.id,
      req.body
    );
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { data, status } = await categoryService.destroy(req.params.id);
    res.status(status).json(data);
  },
};

module.exports = controller;
