"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Coupon extends Model {
    static associate(models) {
      Coupon.hasMany(models.Order, {
        foreignKey: "couponId",
        as: "orders",
      });
    }
  }
  Coupon.init(
    {
      name: DataTypes.STRING,
      start: DataTypes.DATE,
      end: DataTypes.DATE,
      percent: DataTypes.FLOAT,
      banner: DataTypes.STRING,
      description: DataTypes.STRING,
      code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Coupon",
    }
  );
  return Coupon;
};
