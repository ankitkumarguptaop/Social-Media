const { Op } = require("sequelize");
const { ForBidden, NoContent } = require("../libs/errors");
const Images = require("../models/image");
const { chatRepository, userRepository } = require("../repositories");
const Users = require("../models/user");
const Chats = require("../models/chat");

exports.listChat = async (payload) => {
  const { id } = payload.user;
  console.log("✌️id --->", id);
  const users = await userRepository.findAll({
    criteria: { id: { [Op.ne]: id } },
    include: [
      {
        model: Images,
        as: "images",
        where: {
          post_id: null,
        },
      },
    ],
  });

  const allCreatedChats = await chatRepository.findAll({
    criteria: {
        [Op.or]: [{member2:id},{member1:id}],
    },
  });

  if (!users) {
    throw new NoContent("chats not found");
  }
  return {users ,allCreatedChats} ;
};

exports.createChat = async (payload) => {
  const { member1, member2 } = payload.body;

  const ischatExist = await chatRepository.findOne({
    member1: { [Op.in]: [member1, member2] },
    member2: { [Op.in]: [member1, member2] },
  });
  if (ischatExist) {
    return ischatExist;
  }

  const chat = await chatRepository.create({
    member1: member1,
    member2: member2,
  });

  if (!chat) {
    throw new NoContent("Failed to create chat");
  }

  return chat;
};
