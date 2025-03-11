"use strict";

const { Sequelize } = require("sequelize");
const { sequelize } = require("../configs/db");
const Posts = require("./post");
const Comments = require("./comment");
const Users = require("./user");

const Likes = sequelize.define(
  "Likes",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    user_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    post_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "Posts",
        key: "id",
      },
    },
    comment_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "Comments",
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
    modelName: "Likes",
    tableName: "Likes",
  }
);

Likes.belongsTo(Users, {
  as: "user",
  foreignKey: "user_id",
});

Users.hasMany(Likes, {
  as: "likes",
  foreignKey: "user_id",
});

Likes.belongsTo(Posts, {
  as: "post",
  foreignKey: "post_id",
});

Posts.hasMany(Likes, {
  as: "likes",
  foreignKey: "post_id",
});

Likes.belongsTo(Comments, {
  as: "comment",
  foreignKey: "comment_id",
});

Comments.hasMany(Likes, {
  as: "likes",
  foreignKey: "comment_id",
});

module.exports = Likes;
