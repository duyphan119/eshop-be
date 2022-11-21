const { Router } = require("express");
const controller = require("../../controllers/productUser.controller");
const { verifyToken } = require("../../middlewares/auth.middleware");

const router = Router();

router.get("/product", controller.getByProduct);
router.get("/user", controller.getByUser);

router.post("/", verifyToken, controller.create);

router.delete("/:id", verifyToken, controller.destroy);
router.delete("/", verifyToken, controller.destroyByProductAndUser);

router.put("/:id", controller.update);

module.exports = router;
