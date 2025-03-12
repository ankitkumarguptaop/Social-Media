const {
  ForBidden,
  UnAuthorized,
  NoContent,
  BadRequest,
} = require("../libs/errors");
const { commentRepository } = require("../repositories");

exports.addCommentOnPost = async (payload) => {
  const { postId } = payload.params;
  const { id } = payload.user;
  const { content } = payload.body;

  if (!postId) {
    throw new BadRequest("Post id Not given");
  }

  const response = await commentRepository.create({
    content: content,
    user_id: id,
    post_id: postId,
    parent_comment_id: null,
  });

  if (!response) {
    throw new NoContent("Comment not created");
  }
  return response;
};

exports.addCommentOnComment = async (payload) => {
  const { commentId } = payload.params;
  const { id } = payload.user;
  const { content } = payload.body;

  if (!commentId) {
    throw new BadRequest("Comment Id Not given");
  }

  const response = await commentRepository.create({
    content: content,
    user_id: id,
    parent_comment_id: commentId,
    post_id: null,
  });

  if (!response) {
    throw new NoContent("Comment not created");
  }
  return response;
};

exports.deleteComment = async (payload) => {
  const { commentId } = payload.params;
  const { id } = payload.user;
  const comment = await commentRepository.findOne({ id: commentId });
  if (!comment) {
    throw new NoContent("Comment not found");
  }
  if (comment.user_id !== id) {
    throw new ForBidden("You have no access to delete this comment");
  }
  return await commentRepository.softDelete({ criteria: { id: commentId } });
};

exports.updateComment = async (payload) => {
  const { commentId } = payload.params;
  const { id } = payload.user;
  const { content } = payload.body;
  const comment = await commentRepository.findOne({ id: commentId });
  if (!comment) {
    throw new ForBidden("Comment not found");
  }
  if (comment.user_id !== id) {
    throw new ForBidden("You dont have access to update this comment");
  }
  return await commentRepository.update({
    payload: { content: content },
    criteria: { id: commentId },
  });
};

exports.listPostComment = async (payload) => {
  const { page = 1, limit = 5 } = payload.query;
  const { postId } = payload.params;
  let offset = 0;
  if (page && limit) {
    offset = limit * (page - 1);
  }
  const posts = await commentRepository.findAndCountAll({
    criteria: { post_id: postId },
    include: ["user"],
    offset: offset,
    limit: limit,
  });
  if (!posts) {
    throw new NoContent("Commnet not found");
  }
  const count = await commentRepository.count({});
  return { ...posts, count: count };
};

exports.listCommentComment = async (payload) => {
  const { page = 1, limit = 5 } = payload.query;
  const { commentId } = payload.params;
  let offset = 0;
  if (page && limit) {
    offset = limit * (page - 1);
  }
  const posts = await commentRepository.findAndCountAll({
    criteria: { id: commentId },
    include: ["user" ,'comments'],
    offset: offset,
    limit: limit,
  });
  if (!posts) {
    throw new NoContent("Commnet not found");
  }
  const count = await commentRepository.count({});
  return { ...posts, count: count };
};
