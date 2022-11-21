"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.belongsTo(models.GroupCategory, {
        foreignKey: "groupCategoryId",
        as: "groupCategory",
      });
      Category.hasMany(models.GroupProduct, {
        foreignKey: "categoryId",
        as: "groupProducts",
      });
    }
  }
  Category.init(
    {
      name: DataTypes.STRING,
      shortName: DataTypes.STRING,
      slug: DataTypes.STRING,
      banner: DataTypes.STRING,
      avatar: DataTypes.STRING,
      isHot: DataTypes.BOOLEAN,
      description: DataTypes.STRING,
      groupCategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Category",
    }
  );
  return Category;
};
