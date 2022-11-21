const userCouponService = require("../services/userCoupon.service");

const controller = {
  getAll: async (req, res) => {
    const { data, status } = await userCouponService.getAll(
      req.query,
      req.user
    );
    res.status(status).json(data);
  },
};

module.exports = controller;
