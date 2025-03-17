"use strict";

const { Sequelize } = require("sequelize");
const { sequelize } = require("../configs/db");
const Users = require("./user");

const Chats = sequelize.define(
  "Chats",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    member1: {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
    },
    member2: {
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
    paranoid: true,
    modelName: "Chats",
    tableName: "Chats",
  }
);

Chats.belongsTo(Users, {
  as: "user1",
  foreignKey: "member1",
});

Users.hasMany(Chats, {
  as: "chats1",
  foreignKey: "member1",
});

Chats.belongsTo(Users, {
  as: "user2",
  foreignKey: "member1",
});

Users.hasMany(Chats, {
  as: "chats2",
  foreignKey: "member2",
});

module.exports = Chats;
