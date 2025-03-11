"use strict";

const { Sequelize } = require("sequelize");
const { sequelize } = require("../configs/db");
const Posts = require("./post");
const Users = require("./user");

const Comments = sequelize.define(
  "Comments",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    content: {
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
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    parent_comment_id: {
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
  },
  {
    modelName: "Comments",
    tableName: "Comments",
  }
);

Comments.belongsTo(Posts, {
  as: "post",
  foreignKey: "post_id",
});

Posts.hasMany(Comments, {
  as: "comments",
  foreignKey: "post_id",
});

Comments.belongsTo(Users, {
  as: "user",
  foreignKey: "user_id",
});

Users.hasMany(Comments, {
  as: "comments",
  foreignKey: "user_id",
});

Comments.belongsTo(Comments, {
  as: "comment",
  foreignKey: "parent_comment_id",
});

Comments.hasMany(Comments, {
  as: "comments",
  foreignKey: "parent_comment_id",
});

module.exports = Comments;
