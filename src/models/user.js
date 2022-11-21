"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: "roleId",
        as: "role",
      });
      User.hasOne(models.Cart, {
        foreignKey: "userId",
        as: "cart",
      });
      User.hasMany(models.CommentProduct, {
        foreignKey: "userId",
        as: "comments",
      });
      User.hasMany(models.RepCommentProduct, {
        foreignKey: "userId",
        as: "repComments",
      });
      User.hasMany(models.ProductUser, {
        foreignKey: "userId",
        as: "productUsers",
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      telephone: DataTypes.STRING,
      address: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      city: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      ward: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      district: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      fullName: DataTypes.STRING,
      avatar: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
