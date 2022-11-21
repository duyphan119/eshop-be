const db = require("../models");
const { Op } = require("sequelize");
const getGroupProductInclude = () => {
  return [
    {
      model: db.GroupProduct,
      as: "groupProduct",
      include: [
        {
          model: db.Category,
          as: "category",
          include: [
            {
              model: db.GroupCategory,
              as: "groupCategory",
            },
          ],
        },
        {
          model: db.Discount,
          as: "discounts",
          required: false,
          where: {
            end: {
              [Op.gt]: new Date().toISOString(),
            },
          },
        },
      ],
    },
    {
      model: db.ProductUser,
      as: "productUsers",
      include: [
        {
          model: db.User,
          as: "user",
        },
      ],
    },
    {
      model: db.ProductDetail,
      as: "details",
      attributes: ["avatar"],
    },
  ];
};

const getDiscountInclude = () => {
  return [
    {
      model: db.GroupProduct,
      as: "groupProduct",
      include: [
        {
          model: db.Category,
          as: "category",
          include: [
            {
              model: db.GroupCategory,
              as: "groupCategory",
            },
          ],
        },
      ],
    },
  ];
};

const getUserInclude = () => {
  return [
    {
      model: db.Cart,
      as: "cart",
    },
    {
      model: db.Role,
      as: "role",
    },
  ];
};

const getCommentProductInclude = () => {
  return [
    {
      model: db.User,
      as: "user",
    },
    {
      model: db.Product,
      as: "product",
    },
    {
      model: db.RepCommentProduct,
      as: "repComments",
      include: {
        model: db.User,
        as: "user",
      },
    },
  ];
};

const getAllProductInclude = (slug = null) => {
  return [
    {
      model: db.GroupProduct,
      as: "groupProduct",
      include: [
        {
          model: db.Category,
          as: "category",
          include: [
            {
              model: db.GroupCategory,
              as: "groupCategory",
            },
          ],
        },
        {
          model: db.Discount,
          as: "discounts",
          required: false,
          where: {
            end: {
              [Op.gt]: new Date().toISOString(),
            },
          },
        },
        {
          model: db.Product,
          as: "products",
          where: {
            slug: {
              [Op.not]: slug,
            },
          },
          limit: 4,
        },
      ],
    },
    {
      model: db.ProductDetail,
      as: "details",
      include: [
        {
          model: db.Color,
          as: "color",
        },
        {
          model: db.Size,
          as: "size",
        },
        {
          model: db.Product,
          as: "product",
        },
      ],
    },
    {
      model: db.ProductImage,
      as: "images",
    },
    {
      model: db.CommentProduct,
      as: "comments",
      include: {
        model: db.RepCommentProduct,
        as: "repComments",
      },
    },
  ];
};
const getAllGroupCategoriesInclude = () => {
  return [
    {
      model: db.Category,
      as: "categories",
      include: [{ model: db.GroupProduct, as: "groupProducts" }],
    },
  ];
};
const getAllGroupProductInclude = () => {
  return [
    {
      model: db.Category,
      as: "category",
      include: [{ model: db.GroupCategory, as: "groupCategory" }],
    },
  ];
};
const getAllCategoriesInclude = () => {
  return [
    { model: db.GroupProduct, as: "groupProducts" },
    { model: db.GroupCategory, as: "groupCategory" },
  ];
};
const getCartByUserInclude = () => {
  return [
    {
      model: db.CartItem,
      as: "items",
      include: getCartItemInclude(),
    },
    {
      model: db.User,
      as: "user",
      // include: getCartItemInclude(),
    },
  ];
};
const getCartItemInclude = () => {
  return [
    {
      model: db.ProductDetail,
      as: "detail",
      include: getProductDetailInclude(),
    },
  ];
};
const getProductDetailInclude = () => {
  return [
    {
      model: db.Product,
      as: "product",
      include: getGroupProductInclude(),
    },
    {
      model: db.Color,
      as: "color",
    },
    {
      model: db.Size,
      as: "size",
    },
  ];
};
const getOrderItemInclude = () => {
  return [
    {
      model: db.ProductDetail,
      as: "detail",
      include: getProductDetailInclude(),
    },
  ];
};

const getStatisticsOrderItemInclude = () => {
  return [
    {
      model: db.ProductDetail,
      as: "detail",
      include: getProductDetailInclude(),
    },
    {
      model: db.Order,
      as: "order",
    },
  ];
};
const getOrderInclude = () => {
  return [
    {
      model: db.Coupon,
      as: "coupon",
    },
    {
      model: db.OrderStatus,
      as: "orderStatus",
    },
  ];
};

const getOrderByIdInclude = () => {
  return [
    ...getOrderInclude(),
    { model: db.OrderItem, as: "items", include: getOrderItemInclude() },
  ];
};

const getUserCouponInclude = () => {
  return [
    {
      model: db.Coupon,
      as: "coupon",
    },
    {
      model: db.User,
      as: "user",
    },
  ];
};
const getRepCommentProductInclude = () => {
  return [
    {
      model: db.CommentProduct,
      as: "comment",
    },
    {
      model: db.User,
      as: "user",
    },
  ];
};
const getProductImageInclude = () => {
  return [
    {
      model: db.Product,
      as: "product",
    },
  ];
};
module.exports = {
  getAllProductInclude,
  getAllGroupCategoriesInclude,
  getCartByUserInclude,
  getCartItemInclude,
  getProductDetailInclude,
  getGroupProductInclude,
  getAllCategoriesInclude,
  getAllGroupProductInclude,
  getUserInclude,
  getOrderInclude,
  getOrderItemInclude,
  getUserCouponInclude,
  getCommentProductInclude,
  getRepCommentProductInclude,
  getOrderByIdInclude,
  getStatisticsOrderItemInclude,
  getDiscountInclude,
  getProductImageInclude,
};
