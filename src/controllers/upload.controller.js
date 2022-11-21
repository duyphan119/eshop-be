const uploadService = require("../services/upload.service");

const controller = {
  upload: async (req, res) => {
    const { status, data } = await uploadService.upload(req.files);
    res.status(status).json(data);
  },
  deleteFile: async (req, res) => {
    const { status, data } = await uploadService.deleteFile(req.body);
    res.status(status).json(data);
  },
};

module.exports = controller;
