const { NoContent, ForBidden } = require("../libs/errors");
const { messageRepository } = require("../repositories");

exports.createMessage = async (payload) => {
  const { message } = payload.body;
  const { id } = payload.user;
  const { chatId } = payload.params;

  const newMessage = await messageRepository.create({
    sender_id: id,
    room_id: chatId,
    message: message,
  });

  if (!newMessage) {
    throw new NoContent("messages not create");
  }

  return newMessage;
};

exports.listMessage = async (payload) => {
  const { chatId } = payload.params;
  const messages = await messageRepository.findAll({
    criteria: { room_id: chatId },
    
  });
  if (!messages) {
    throw new NoContent("messages not found");
  }
  return messages;
};
