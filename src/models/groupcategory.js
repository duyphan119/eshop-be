"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GroupCategory extends Model {
    static associate(models) {
      GroupCategory.hasMany(models.Category, {
        foreignKey: "groupCategoryId",
        as: "categories",
      });
    }
  }
  GroupCategory.init(
    {
      name: DataTypes.STRING,
      shortName: DataTypes.STRING,
      slug: DataTypes.STRING,
      banner: DataTypes.STRING,
      avatar: DataTypes.STRING,
      isHot: DataTypes.BOOLEAN,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "GroupCategory",
    }
  );
  return GroupCategory;
};
