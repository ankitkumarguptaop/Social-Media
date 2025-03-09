"use strict";

const { Sequelize } = require("sequelize");
const { sequelize } = require("../configs/db");
const Posts = require("./post");

const  Comments= sequelize.define(
  "Comments",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    content: {
      type: Sequelize.STRING
    },
    post_id: {
      type: Sequelize.INTEGER,
      references: {
        model: "Posts",
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
    tableName: "Comments"
  }
);




Comments.belongsTo(Posts, {
  as:"post",
  foreignKey: "post_id",
});

Posts.hasMany(Comments, {
  as:"comments",
  foreignKey: "post_id",
});


Comments.belongsTo(Comments, {
  as:"parent_comment",
  foreignKey: "parent_comment_id",
});



module.exports = Comments;