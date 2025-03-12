const { OK } = require("../libs/constants");
const { commentService } = require("../services");

exports.addCommentOnComment = async (req, res, next) => {
  try {
    const response = await commentService.addCommentOnComment({
      body: req.body,
      params: req.params,
      query: req.query,
      user: req.user,
    });
    res
      .status(OK)
      .json({ message: "successfuly comment added", comment: response });
  } catch (error) {
    console.log("Failed to comment on post", error);
    return next(error);
  }
};

exports.addCommentOnPost = async (req, res, next) => {
  try {
    const response = await commentService.addCommentOnPost({
      body: req.body,
      params: req.params,
      query: req.query,
      user: req.user,
    });
    res
      .status(OK)
      .json({ message: "successfuly comment added", comment: response });
  } catch (error) {
    console.log("Failed to comment on post", error);
    return next(error);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const response = await commentService.deleteComment({
      params: req.params,
      body: req.body,
      user: req.user,
    });
    res
      .status(OK)
      .json({ message: "successfuly deleted comment", comment: response });
  } catch (error) {
    console.log("Failed to delete comment", error);
    return next(error);
  }
};

exports.updateComment = async (req, res, next) => {
  try {
    const response = await commentService.updateComment({
      params: req.params,
      body: req.body,
      user: req.user,
    });
    res
      .status(OK)
      .json({ message: "successfuly updated comment", comment: response });
  } catch (error) {
    console.log("Failed to update comment", error.message);
    return next(error);
  }
};

exports.listCommentComment = async (req, res, next) => {
  try {
    const response = await commentService.listCommentComment({
      params: req.params,
      query: req.query,
      body: req.body,
      user: req.user,
    });
    res
      .status(OK)
      .json({ message: "successfuly list comment", comment: response });
  } catch (error) {
    console.log("Failed to list comment", error.message);
    return next(error);
  }
};

exports.listPostComment = async (req, res, next) => {
  try {
    const response = await commentService.listPostComment({
      params: req.params,
      body: req.body,
      user: req.user,
      query: req.query,
    });
    res
      .status(OK)
      .json({ message: "successfuly list comment", comment: response });
  } catch (error) {
    console.log("Failed to list comment", error.message);
    return next(error);
  }
};
