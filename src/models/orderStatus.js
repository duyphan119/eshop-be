"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderStatus extends Model {
    static associate(models) {
      OrderStatus.hasMany(models.Order, {
        foreignKey: "OrderStatusId",
        as: "orders",
      });
    }
  }
  OrderStatus.init(
    {
      name: DataTypes.STRING,
      userIsAllowedDelete: {
        type: DataTypes.BOOLEAN,
        default: 1,
      },
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "OrderStatus",
    }
  );
  return OrderStatus;
};
