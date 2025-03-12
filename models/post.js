"use strict";

const { Sequelize } = require("sequelize");
const { sequelize } = require("../configs/db");
const Users = require("./user");

const Posts = sequelize.define(
  "Posts",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    caption: {
      allowNull: false,
      type: Sequelize.STRING,
      require:true
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
    deletedAt: {
      type: Sequelize.DATE,
    },
  },
  {
    paranoid: true,
    modelName: "Posts",
    tableName: "Posts",
  }
);

Posts.belongsTo(Users, {
  as: "user",
  foreignKey: "user_id",
});

Users.hasMany(Posts, {
  as: "posts",
  foreignKey: "user_id",
});

module.exports = Posts;
