const {
  BadRequest,
  ForBidden,
  UnAuthorized,
  NoContent,
} = require("../libs/errors");
const Images = require("../models/image");
const Users = require("../models/user");
const {
  postRepository,
  userRepository,
  imageRepository,
} = require("../repositories");

exports.createPost = async (payload) => {
  const { caption } = payload.body;
  const { id } = payload.user;
  const { postImages } = payload?.files;

  if (!caption || !postImages) {
    throw new BadRequest("caption and post image is not given");
  }

  const post = await postRepository.create({ caption: caption, user_id: id });

  if (!post) {
    throw new NoContent("Post not created");
  }

  const images = postImages.map((image) => {
    return { image_url: image.path, post_id: post.id, user_id: id };
  });

  const postImagesCreated = await imageRepository.createBulk(images);
  if (!postImagesCreated) {
    throw new NoContent("Post images not created");
  }
  return post;
};

exports.listPost = async (payload) => {
  const { page = 1, limit = 5 } = payload.query;
  let offset = 0;
  if (page && limit) {
    offset = limit * (page - 1);
  }
  const posts = await postRepository.findAndCountAll({
    include: ["images", "comments", "user" ,{
      model: Users,
      as: "user",
      include: [{
        model: Images,
        as: "images",
        where:{
          post_id: null
        }
      }]
    }],
    offset: offset,
    limit: limit,
  });
  if (!posts) {
    throw new NoContent("Posts not found");
  }
  const count = await postRepository.count({});
  return { ...posts, count: count };
};

exports.listUserPost = async (payload) => {
  const { id } = payload.user;
  const { page = 1, limit = 5 } = payload.query;
  let offset = 0;
  if (page && limit) {
    offset = limit * (page - 1);
  }
  const posts = await postRepository.findAll({
    criteria: { user_id: id },
    include: ["images", "comments", "user_id"],
    offset: offset,
    limit: limit,
  });
  if (!posts) {
    throw new NoContent("Posts not found");
  }
  const count = await postRepository.count();
  return posts;
};

exports.deletePost = async (payload) => {
  const { postId } = payload.params;
  const { id } = payload.user;
  const post = await postRepository.findOne({ id: postId });
  if (!post) {
    throw new ForBidden("Post not found");
  }
  if (post.user_id !== id) {
    throw new UnAuthorized("You are not authorized to delete this post");
  }
  await imageRepository.softDelete({ criteria: { post_id: postId } });

  return await postRepository.softDelete({
    criteria: { id: id },
    options: { returning: true },
  });
};

exports.updatePost = async (payload) => {
  const { postId } = payload.params;
  const { id } = payload.user;
  const post = await postRepository.findOne({ id: postId });
  if (!post) {
    throw new ForBidden("Post not found");
  }
  if (post.user_id !== id) {
    throw new UnAuthorized("You are not authorized to update this post");
  }
  return await postRepository.update({
    payload: payload.body,
    criteria: { id: postId },
    options: { returning: true },
  });
};
