const groupCategoryService = require("../services/groupCategory.service");

const controller = {
  getAll: async (req, res) => {
    const { data, status } = await groupCategoryService.getAll(req.query);
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { data, status } = await groupCategoryService.create(req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { data, status } = await groupCategoryService.update(
      req.params.id,
      req.body
    );
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { data, status } = await groupCategoryService.destroy(req.params.id);
    res.status(status).json(data);
  },
};

module.exports = controller;
