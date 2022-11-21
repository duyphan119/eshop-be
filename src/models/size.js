"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Size extends Model {
    static associate(models) {
      Size.hasMany(models.ProductDetail, {
        foreignKey: "sizeId",
        as: "details",
      });
    }
  }
  Size.init(
    {
      value: DataTypes.STRING,
      shortValue: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Size",
    }
  );
  return Size;
};
