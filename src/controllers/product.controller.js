const productService = require("../services/product.service");

const controller = {
  getAll: async (req, res) => {
    const { data, status } = await productService.getAll(req.user, req.query);
    res.status(status).json(data);
  },
  getByGroupCategorySlug: async (req, res) => {
    const { data, status } = await productService.getByGroupCategorySlug(
      req.user,
      req.query,
      req.params.slug
    );
    res.status(status).json(data);
  },
  getByCategorySlug: async (req, res) => {
    const { data, status } = await productService.getByCategorySlug(
      req.user,
      req.query,
      req.params.slug
    );
    res.status(status).json(data);
  },
  getByGroupProductSlug: async (req, res) => {
    const { data, status } = await productService.getByGroupProductSlug(
      req.user,
      req.query,
      req.params.slug
    );
    res.status(status).json(data);
  },
  getBySlug: async (req, res) => {
    const { data, status } = await productService.getBySlug(
      req.user,
      req.query,
      req.params.slug
    );
    res.status(status).json(data);
  },
  search: async (req, res) => {
    const { data, status } = await productService.search(req.user, req.query);
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { data, status } = await productService.create(req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { data, status } = await productService.update(
      req.params.id,
      req.body
    );
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { data, status } = await productService.destroy(req.params.id);
    res.status(status).json(data);
  },
};

module.exports = controller;
