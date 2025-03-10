const {
  BadRequest,
  ForBidden,
  UnAuthorized,
  NoContent,
} = require("../libs/errors");
const { commentRepository } = require("../repositories");

exports.addComment = async (payload) => {
  const {  postId } = payload.params;
  const {commentId=null}=payload.query;
  const { id } = payload.user;
  const { content } = payload.body;

  let response = null;
  if (commentId) {
    response = await commentRepository.create({
      content: content,
      user_id: id,
      parent_comment_id: commentId,
      post_id: postId,
    });
  } else {
    response = await commentRepository.create({
      content: content,
      user_id: id,
      post_id: postId,
    });
  }
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
    throw new ForBidden("Comment not found");
  }
  if (comment.user_id !== id) {
    throw new UnAuthorized("You are not authorized to delete this comment");
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
    throw new UnAuthorized("You are not authorized to update this comment");
  }
  return await commentRepository.update({
    payload: { content: content },
    criteria: { id: commentId },
  });
};
