const Likes = require("../models/like");
const BaseRepository = require("./base.repository");

class LikeRepository extends BaseRepository {
  constructor({ model }) {
    super({ model });
  }
}

module.exports = new LikeRepository({ model: Likes });
