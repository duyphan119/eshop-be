const { Router } = require("express");
const controller = require("../../controllers/cartItem.controller");
const { verifyToken } = require("../../middlewares/auth.middleware");
const router = Router();

router.post("/", verifyToken, controller.create);
router.put("/:id", verifyToken, controller.update);
router.delete("/:id", verifyToken, controller.destroy);

module.exports = router;
