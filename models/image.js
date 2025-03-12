"use strict";

const { Sequelize } = require("sequelize");
const { sequelize } = require("../configs/db");
const Posts = require("./post");
const Users = require("./user");

const Images = sequelize.define(
  "Images",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    image_url: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    post_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "Posts",
        key: "id",
      },
    },
    user_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  },
  {
    modelName: "Images",
    tableName: "Images",
  }
);

Images.belongsTo(Posts, {
  as: "post",
  foreignKey: "post_id",
});

Posts.hasMany(Images, {
  as: "images",
  foreignKey: "post_id",
});

Images.belongsTo(Users, {
  as: "user",
  foreignKey: "user_id",
});

Users.hasMany(Images,{
  as: "images",
  foreignKey: "user_id"
})

module.exports = Images;
