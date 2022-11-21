"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductUser extends Model {
    static associate(models) {
      ProductUser.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      ProductUser.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
      });
    }
  }
  ProductUser.init(
    {
      userId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductUser",
    }
  );
  return ProductUser;
};
