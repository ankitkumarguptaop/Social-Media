const Comments = require("../models/comment");
const BaseRepository = require("./base.repository");

class CommentRepository extends BaseRepository {
  constructor({ model }) {
    super({ model });
  }
}

module.exports = new CommentRepository({ model: Comments });
