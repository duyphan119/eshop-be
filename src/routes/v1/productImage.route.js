const { Router } = require("express");
const controller = require("../../controllers/productImage.controller");
const { verifyAdmin } = require("../../middlewares/auth.middleware");

const router = Router();

router.get("/", controller.getAll);

router.post("/", verifyAdmin, controller.create);

router.delete("/", verifyAdmin, controller.destroyMany);
router.delete("/:id", verifyAdmin, controller.destroy);

router.put("/:id", verifyAdmin, controller.update);
module.exports = router;
