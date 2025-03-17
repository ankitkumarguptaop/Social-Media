const Messages = require("../models/message");
const BaseRepository = require("./base.repository");

class MessageRepository extends BaseRepository {
  constructor({ model }) {
    super({ model });
  }
}

module.exports = new MessageRepository({ model: Messages });
