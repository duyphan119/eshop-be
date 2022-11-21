const { Router } = require("express");
const controller = require("../../controllers/productDetail.controller");
const { verifyAdmin } = require("../../middlewares/auth.middleware");

const router = Router();

router.get("/", controller.getAll);

router.post("/", verifyAdmin, controller.create);

router.delete("/:id", verifyAdmin, controller.destroy);

router.put("/:id", verifyAdmin, controller.update);
module.exports = router;
