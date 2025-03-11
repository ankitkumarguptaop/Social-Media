const { ForBidden, NoContent, BadRequest } = require("../libs/errors");
const { likeRepository, postRepository } = require("../repositories");

exports.addLikeOnComment = async (payload) => {
  const { commentId } = payload.params;
  const { id } = payload.user;

  const commentLike = await likeRepository.findOne(
    {
      post_id: null,
      comment_id: commentId,
      user_id: id,
    },
    [],
    { paranoid: false }
  );

  let response = null;
  if (commentLike) {
    response = await likeRepository.update({
      payload: { deletedAt: null },
      criteria: {
        deletedAt: { ne: null },
        post_id: null,
        comment_id: commentId,
        user_id: id,
      },
      options: { paranoid: false },
    });
  } else {
    response = await likeRepository.create({
      post_id: null,
      comment_id: commentId,
      user_id: id,
    });
  }

  if (!response) {
    throw new ForBidden("Like not created");
  }
  return response;
};

exports.addLikeOnPost = async (payload) => {
  const { postId } = payload.params;
  const { id } = payload.user;

  const post = await postRepository.findOne({ id: postId });

  if (!post) {
    throw new ForBidden("Post is not there");
  }

  const PostLike = await likeRepository.findOne(
    {
      post_id: postId,
      user_id: id,
      comment_id: null,
    },
    [],
    { paranoid: false }
  );
  let response = null;
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

  if (!response) {
    throw new ForBidden("Like not created");
  }
  return response;
};

exports.listPostlikes = async (payload) => {
  const { postId } = payload.params;
  if (!postId) {
    throw BadRequest("Post id not given");
  }

  const response = await likeRepository.findAndCountAll({
    criteria: { post_id: postId },
    include: ["user"],
    offset: null,
    limit: null,
  });

  if (!response) {
    throw NoContent("likes are not there");
  }
  return {...response,postId:parseInt(postId)};
};

exports.listCommentlikes = async (payload) => {
  const { commentId } = payload.params;
  if (!commentId) {
    throw BadRequest("comment id not given");
  }
  const response = await likeRepository.findAndCountAll({
    criteria: { comment_id: commentId },
    include: ["user"],
    offset: null,
    limit: null,
  });

  if (!response) {
    throw NoContent("likes are not there");
  }
  return response;
};

exports.removeCommentLike = async (payload) => {
  const { commentId } = payload.params;
  const { id } = payload.user;

  if (!commentId) {
    throw BadRequest("comment id not given");
  }

  return await likeRepository.softDelete({
    criteria: { post_id: null, comment_id: commentId, user_id: id },
  });
};

exports.removePostLike = async (payload) => {
  const { postId } = payload.params;
  const { id } = payload.user;

  if (!postId) {
    throw BadRequest("Post id not given");
  }

  return await likeRepository.softDelete({
    criteria: { post_id: postId, comment_id: null, user_id: id },
  });
};
