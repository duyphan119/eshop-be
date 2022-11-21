const roleService = require("../services/role.service");

const controller = {
  getAll: async (req, res) => {
    const { data, status } = await roleService.getAll(req.query);
    res.status(status).json(data);
  },
  create: async (req, res) => {
    const { data, status } = await roleService.create(req.body);
    res.status(status).json(data);
  },
  update: async (req, res) => {
    const { data, status } = await roleService.update(req.params.id, req.body);
    res.status(status).json(data);
  },
  destroy: async (req, res) => {
    const { data, status } = await roleService.destroy(req.params.id);
    res.status(status).json(data);
  },
};

module.exports = controller;
