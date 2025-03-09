const Images = require("../models/image");
const BaseRepository = require("./base.repository");

class ImageRepository extends BaseRepository {
  constructor({ model }) {
    super({ model });
  }
}

module.exports = new ImageRepository({ model: Images });
