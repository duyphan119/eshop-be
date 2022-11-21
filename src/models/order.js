"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      Order.belongsTo(models.Coupon, {
        foreignKey: "couponId",
        as: "coupon",
      });
      Order.belongsTo(models.OrderStatus, {
        foreignKey: "orderStatusId",
        as: "orderStatus",
      });
      Order.hasMany(models.OrderItem, {
        foreignKey: "orderId",
        as: "items",
      });
    }
  }
  Order.init(
    {
      userId: DataTypes.INTEGER,
      telephone: DataTypes.STRING,
      fullName: DataTypes.STRING,
      deliveryPrice: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      address: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      city: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      ward: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      district: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      tempPrice: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER,
      orderStatusId: DataTypes.INTEGER,
      couponId: DataTypes.INTEGER,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
