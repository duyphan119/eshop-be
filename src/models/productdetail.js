"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductDetail extends Model {
    static associate(models) {
      ProductDetail.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
      });
      ProductDetail.belongsTo(models.Size, {
        foreignKey: "sizeId",
        as: "size",
      });
      ProductDetail.belongsTo(models.Color, {
        foreignKey: "colorId",
        as: "color",
      });
      ProductDetail.hasMany(models.OrderItem, {
        foreignKey: "detailId",
        as: "orderItems",
      });
      ProductDetail.hasMany(models.CartItem, {
        foreignKey: "detailId",
        as: "items",
      });
    }
  }
  ProductDetail.init(
    {
      productId: DataTypes.INTEGER,
      sizeId: DataTypes.INTEGER,
      colorId: DataTypes.INTEGER,
      sku: DataTypes.STRING,
      avatar: DataTypes.STRING,
      amount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductDetail",
    }
  );
  return ProductDetail;
};
