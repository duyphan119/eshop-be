const userService = require("../services/user.service");

const controller = {
  getAll: async (req, res) => {
    const { data, status } = await userService.getAll(req.query);
    res.status(status).json(data);
  },
  getById: async (req, res) => {
    const { data, status } = await userService.getById(
      req.query,
      req.params.id
    );
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { data, status } = await userService.create(req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { data, status } = await userService.update(req.params.id, req.body);
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { data, status } = await userService.destroy(req.params.id);
    res.status(status).json(data);
  },
  changePassword: async (req, res) => {
    const { data, status } = await userService.changePassword(
      req.params.id,
      req.body
    );
    res.status(status).json(data);
  },
};

module.exports = controller;
