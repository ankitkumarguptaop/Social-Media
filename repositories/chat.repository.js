const Chats = require("../models/chat");
const BaseRepository = require("./base.repository");

class ChatRepository extends BaseRepository {
  constructor({ model }) {
    super({ model });
  }
}

module.exports = new ChatRepository({ model: Chats });
