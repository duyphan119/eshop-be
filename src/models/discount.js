"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {
    static associate(models) {
      Discount.belongsTo(models.GroupProduct, {
        foreignKey: "groupProductId",
        as: "groupProduct",
      });
    }
  }
  Discount.init(
    {
      groupProductId: DataTypes.INTEGER,
      start: DataTypes.DATE,
      end: DataTypes.DATE,
      percent: DataTypes.FLOAT,
      banner: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Discount",
    }
  );
  return Discount;
};
