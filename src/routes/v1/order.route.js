const { Router } = require("express");
const controller = require("../../controllers/order.controller");
const {
  verifyTokenAndUser,
  verifyAdmin,
  verifyToken,
  verifyTokenUserAndAdmin,
} = require("../../middlewares/auth.middleware");

const router = Router();

router.get("/user/:userId", verifyTokenAndUser, controller.getByUser);
router.get("/:id", verifyAdmin, controller.getById);
router.get("/", controller.getAll);

router.post("/", verifyToken, controller.create);

router.delete("/:id", verifyToken, verifyTokenUserAndAdmin, controller.destroy);

router.put("/:id", verifyAdmin, controller.update);

module.exports = router;
