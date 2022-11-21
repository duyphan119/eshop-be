"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserCoupon extends Model {
    static associate(models) {
      UserCoupon.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      UserCoupon.belongsTo(models.Coupon, {
        foreignKey: "couponId",
        as: "coupon",
      });
    }
  }
  UserCoupon.init(
    {
      userId: DataTypes.INTEGER,
      couponId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserCoupon",
    }
  );
  return UserCoupon;
};
