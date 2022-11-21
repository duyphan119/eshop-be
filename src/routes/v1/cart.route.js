const { Router } = require("express");
const controller = require("../../controllers/cart.controller");

const router = Router();

router.get("/user/:userId", controller.getByUser);

module.exports = router;
