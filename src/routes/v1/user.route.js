const { Router } = require("express");
const controller = require("../../controllers/user.controller");
const {
  verifyAdmin,
  verifyToken,
} = require("../../middlewares/auth.middleware");

const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);

router.post("/", verifyAdmin, controller.create);

router.delete("/:id", verifyAdmin, controller.destroy);

router.put("/change-password/:id", verifyToken, controller.changePassword);
router.put("/:id", verifyToken, controller.update);

module.exports = router;
