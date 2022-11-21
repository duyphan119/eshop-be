"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.GroupProduct, {
        foreignKey: "groupProductId",
        as: "groupProduct",
      });
      Product.hasMany(models.ProductDetail, {
        foreignKey: "productId",
        as: "details",
      });
      Product.hasMany(models.ProductImage, {
        foreignKey: "productId",
        as: "images",
      });
      Product.hasMany(models.CommentProduct, {
        foreignKey: "productId",
        as: "comments",
      });
      Product.hasMany(models.ProductUser, {
        foreignKey: "productId",
        as: "productUsers",
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      initPrice: DataTypes.INTEGER,
      newPrice: DataTypes.INTEGER,
      description: DataTypes.INTEGER,
      avatar: DataTypes.STRING,
      groupProductId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
