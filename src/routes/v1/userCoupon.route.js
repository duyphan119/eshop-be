const { Router } = require("express");
const controller = require("../../controllers/userCoupon.controller");
const { getUser } = require("../../middlewares/auth.middleware");

const router = Router();

router.get("/", getUser, controller.getAll);

module.exports = router;
