const { Router } = require("express");
const controller = require("../../controllers/upload.controller");
const upload = require("../../middlewares/upload.middleware");

const router = Router();

router.post("/", upload.array("images", 100), controller.upload);
router.delete("/", controller.deleteFile);
module.exports = router;
