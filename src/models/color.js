"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    static associate(models) {
      Color.hasMany(models.ProductDetail, {
        foreignKey: "colorId",
        as: "details",
      });
    }
  }
  Color.init(
    {
      value: DataTypes.STRING,
      shortValue: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Color",
    }
  );
  return Color;
};
