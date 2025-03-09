const Posts = require("../models/post");
const BaseRepository = require("./base.repository");

class PostRepository extends BaseRepository {
  constructor({ model }) {
    super({ model });
  }
}

module.exports = new PostRepository({ model: Posts });
