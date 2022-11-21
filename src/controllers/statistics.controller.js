const statisticsService = require("../services/statistics.service");
const controller = {
  getStatisticsUser: async (req, res) => {
    const { data, status } = await statisticsService.getStatisticsUser(
      req.query
    );
    res.status(status).json(data);
  },
  getStatisticsOrder: async (req, res) => {
    const { data, status } = await statisticsService.getStatisticsOrder(
      req.query
    );
    res.status(status).json(data);
  },
  getStatisticsOrderItem: async (req, res) => {
    const { data, status } = await statisticsService.getStatisticsOrderItem(
      req.query
    );
    res.status(status).json(data);
  },
  getStatisticsProduct: async (req, res) => {
    const { data, status } = await statisticsService.getStatisticsProduct(
      req.query
    );
    res.status(status).json(data);
  },
  getStatisticsRevenue: async (req, res) => {
    const { data, status } = await statisticsService.getStatisticsRevenue(
      req.query
    );
    res.status(status).json(data);
  },
  getStatisticsCommentProduct: async (req, res) => {
    const { data, status } =
      await statisticsService.getStatisticsCommentProduct(req.query);
    res.status(status).json(data);
  },
};

module.exports = controller;
