const { BadRequest, ForBidden, UnAuthorized, NoContent } = require("../libs/errors");
const { postRepository, userRepository, likeRepository } = require("../repositories");
const jwt = require("jsonwebtoken");

exports.addLikeOnComment = async (payload) => {
    const { commentId } = payload.params;
    const { id } = payload.user;
    const like = await likeRepository.create({ comment_id: commentId, user_id: id });
    if (!like) {
        throw new NoContent("Like not created");
    }
    return like;
};


exports.addLikeOnPost = async (payload) => {
    const { postId } = payload.params;
    const { id } = payload.user;
    const like = await likeRepository.create({ post_id: postId, user_id: id });
    if (!like) {
        throw new NoContent("Like not created");
    }
    return like;
};


exports.removePostLike = async (payload) => {
    const { postId } = payload.params;
    const { id } = payload.user;
    const like = await likeRepository.findOne({ post_id: postId, user_id: id });
    if (!like) {
        throw new NoContent("Like not found");
    }
    return await likeRepository.softDelete({ criteria: { post_id: postId, user_id: id } });
};


exports.removeCommentLike = async (payload) => {
    const { commentId } = payload.params;
    const { id } = payload.user;
    const like = await likeRepository.findOne({ comment_id: commentId, user_id: id });
    if (!like) {
        throw new NoContent("Like not found");
    }
    return await likeRepository.softDelete({ criteria: { comment_id: commentId, user_id: id } });
};
