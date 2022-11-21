const { Router } = require("express");
const controller = require("../../controllers/repCommentProduct.controller");
const { verifyToken } = require("../../middlewares/auth.middleware");

const router = Router();

router.get("/", controller.getAll);

router.post("/", verifyToken, controller.create);

router.delete("/:id", verifyToken, controller.destroy);

router.put("/:id", verifyToken, controller.update);

module.exports = router;
