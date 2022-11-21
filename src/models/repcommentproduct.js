"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RepCommentProduct extends Model {
    static associate(models) {
      RepCommentProduct.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      RepCommentProduct.belongsTo(models.CommentProduct, {
        foreignKey: "commentId",
        as: "comment",
      });
    }
  }
  RepCommentProduct.init(
    {
      commentId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      content: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "RepCommentProduct",
    }
  );
  return RepCommentProduct;
};
