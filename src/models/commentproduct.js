"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CommentProduct extends Model {
    static associate(models) {
      CommentProduct.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
      });
      CommentProduct.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      CommentProduct.hasMany(models.RepCommentProduct, {
        foreignKey: "commentId",
        as: "repComments",
      });
    }
  }
  CommentProduct.init(
    {
      rate: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      content: DataTypes.STRING,
      productId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CommentProduct",
    }
  );
  return CommentProduct;
};
