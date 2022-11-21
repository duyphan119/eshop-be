"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate(models) {
      CartItem.belongsTo(models.ProductDetail, {
        foreignKey: "detailId",
        as: "detail",
      });
      CartItem.belongsTo(models.Cart, {
        foreignKey: "cartId",
        as: "cart",
      });
    }
  }
  CartItem.init(
    {
      cartId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      detailId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CartItem",
    }
  );
  return CartItem;
};
