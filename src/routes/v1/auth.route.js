const { Router } = require("express");
const controller = require("../../controllers/auth.controller");

const router = Router();

router.post("/login", controller.login);
router.post("/register", controller.register);
router.post("/logout", controller.logout);
router.post("/refresh", controller.refreshToken);

module.exports = router;
