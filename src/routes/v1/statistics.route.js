const { Router } = require("express");
const controller = require("../../controllers/statistics.controller");
const { verifyAdmin } = require("../../middlewares/auth.middleware");

const router = Router();

router.get("/user", verifyAdmin, controller.getStatisticsUser);

router.get("/order", verifyAdmin, controller.getStatisticsOrder);

router.get("/order-item", verifyAdmin, controller.getStatisticsOrderItem);

router.get("/revenue", verifyAdmin, controller.getStatisticsRevenue);

router.get(
  "/comment-product",
  verifyAdmin,
  controller.getStatisticsCommentProduct
);

router.get("/product", verifyAdmin, controller.getStatisticsProduct);

module.exports = router;
