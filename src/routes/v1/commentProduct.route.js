const { Router } = require("express");
const controller = require("../../controllers/commentProduct.controller");
const { verifyToken } = require("../../middlewares/auth.middleware");

const router = Router();

router.get("/product", controller.getByProduct);
router.get("/", controller.getAll);

router.post("/", verifyToken, controller.create);

router.delete("/:id", verifyToken, controller.destroy);

router.put("/:id", verifyToken, controller.update);

module.exports = router;
