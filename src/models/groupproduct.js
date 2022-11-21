"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GroupProduct extends Model {
    static associate(models) {
      GroupProduct.hasMany(models.Product, {
        foreignKey: "groupProductId",
        as: "products",
      });
      GroupProduct.belongsTo(models.Category, {
        foreignKey: "categoryId",
        as: "category",
      });
      GroupProduct.hasMany(models.Discount, {
        foreignKey: "groupProductId",
        as: "discounts",
      });
    }
  }
  GroupProduct.init(
    {
      name: DataTypes.STRING,
      shortName: DataTypes.STRING,
      slug: DataTypes.STRING,
      banner: DataTypes.STRING,
      avatar: DataTypes.STRING,
      isHot: DataTypes.BOOLEAN,
      description: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "GroupProduct",
    }
  );
  return GroupProduct;
};
