const { ForBidden, NoContent } = require("../libs/errors");
const { likeRepository, postRepository } = require("../repositories");
const { options } = require("../routes");

exports.addLike = async (payload) => {
  const { commentId =null } = payload.query;
  const { postId } = payload.params;
  const { id } = payload.user;

  const post = await postRepository.findOne({ id: postId });

  if (!post) {
    throw new ForBidden("Post is not there");
  }

  let response = null;
  if (commentId) {
    const commentLike = await likeRepository.findOne(
      {
        post_id: postId,
        comment_id: commentId,
        user_id: id,
      },
      [],
      { paranoid: false }
    );

    if (commentLike) {
      response = await likeRepository.update({
        payload: { deletedAt: null },
        criteria: {
          deletedAt: { ne: null },
          post_id: postId,
          comment_id: commentId,
          user_id: id,
        },
        options: { paranoid: false },
      })
    } else {
      response = await likeRepository.create({
        post_id: postId,
        comment_id: commentId,
        user_id: id,
      });
    }
  } else {
    const PostLike = await likeRepository.findOne(
      {
        post_id: postId,
        user_id: id,
        comment_id: null,
      },
      [],
     { paranoid: false }
    );

    if (PostLike) {
      response = await likeRepository.update({
        payload: { deletedAt: null },
        criteria: {
          deletedAt: { ne: null },
          post_id: postId,
          user_id: id,
          comment_id: null,
        },
        options: { paranoid: false },
      });
    } else {
      response = await likeRepository.create({
        post_id: postId,
        user_id: id,
        comment_id: null,
      });
    }
  }
  if (!response) {
    throw new ForBidden("Like not created");
  }
  return response;
};

exports.removeLike = async (payload) => {
  const { postId } = payload.params;
  const { commentId = null } = payload.query;
  const { id } = payload.user;

  let like = null;
  if (commentId) {
    like = await likeRepository.create({
      comment_id: commentId,
      post_id: postId,
      user_id: id,
    });
  } else {
    like = await await likeRepository.findOne({
      post_id: postId,
      user_id: id,
      comment_id: null,
    });
  }

  if (!like) {
    throw new NoContent("Like not found");
  }

  return await likeRepository.softDelete({
    criteria: { post_id: postId, comment_id: commentId, user_id: id },
  });
};
