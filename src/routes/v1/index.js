const { Router } = require("express");

const router = Router();

router.use("/role", require("./role.route"));
router.use("/user", require("./user.route"));
router.use("/auth", require("./auth.route"));
router.use("/order", require("./order.route"));
router.use("/coupon", require("./coupon.route"));
router.use("/product", require("./product.route"));
router.use("/group-category", require("./groupCategory.route"));
router.use("/cart", require("./cart.route"));
router.use("/cart-item", require("./cartItem.route"));
router.use("/order-item", require("./orderItem.route"));
router.use("/order-status", require("./orderStatus.route"));
router.use("/category", require("./category.route"));
router.use("/color", require("./color.route"));
router.use("/comment-product", require("./commentProduct.route"));
router.use("/rep-comment-product", require("./repCommentProduct.route"));
router.use("/size", require("./size.route"));
router.use("/statistics", require("./statistics.route"));
router.use("/upload", require("./upload.route"));
router.use("/discount", require("./discount.route"));
router.use("/group-product", require("./groupProduct.route"));
router.use("/user-coupon", require("./userCoupon.route"));
router.use("/product-detail", require("./productDetail.route"));
router.use("/product-image", require("./productImage.route"));
router.use("/product-user", require("./productUser.route"));

module.exports = router;
