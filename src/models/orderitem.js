"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    static associate(models) {
      OrderItem.belongsTo(models.ProductDetail, {
        foreignKey: "detailId",
        as: "detail",
      });
      OrderItem.belongsTo(models.Order, {
        foreignKey: "orderId",
        as: "order",
      });
    }
  }
  OrderItem.init(
    {
      orderId: DataTypes.INTEGER,
      detailId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      productPrice: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OrderItem",
    }
  );
  return OrderItem;
};
