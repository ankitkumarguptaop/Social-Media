const { INTERNAL_SERVER_ERROR, OK } = require("../libs/constants");

const { likeService } = require("../services");

exports.addLikeOnComment = async (req, res, next) => {
  try {
    const response = await likeService.addLikeOnComment({
      body: req.body,
      params: req.params,
      query: req.query,
      user: req.user,
    });
    res.status(OK).json({ message: "successfuly liked ", like: response });
  } catch (error) {
    console.log("Failed to liked ", error.message);
    return next(error);
  }
};

exports.addLikeOnPost = async (req, res, next) => {
  try {
    const response = await likeService.addLikeOnPost({
      body: req.body,
      params: req.params,
      query: req.query,
      user: req.user,
    });
    res.status(OK).json({ message: "successfuly liked ", like: response });
  } catch (error) {
    console.log("Failed to liked ", error.message);
    return next(error);
  }
};

exports.removeCommentLike = async (req, res, next) => {
  try {
    const response = await likeService.removeCommentLike({
      body: req.body,
      user: req.user,
      params: req.params,
    });
    res
      .status(OK)
      .json({ message: "successfuly removed comment like", like: response });
  } catch (error) {
    console.log("Failed to removed comment like", error.message);
    return next(error);
  }
};

exports.removePostLike = async (req, res, next) => {
  try {
    const response = await likeService.removePostLike({
      body: req.body,
      user: req.user,
      params: req.params,
    });
    res
      .status(OK)
      .json({ message: "successfuly removed posr like", like: response });
  } catch (error) {
    console.log("Failed to removed post like", error.message);
    return next(error);
  }
};

exports.listPostLike = async (req, res, next) => {
  try {
    const response = await likeService.listPostlikes({
      body: req.body,
      user: req.user,
      params: req.params,
    });
    res
      .status(OK)
      .json({ message: "successfuly list comment like", like: response });
  } catch (error) {
    console.log("Failed to list comment like", error.message);
    return next(error);
  }
};

exports.listCommentLike = async (req, res, next) => {
  try {
    const response = await likeService.listCommentlikes({
      body: req.body,
      user: req.user,
      params: req.params,
    });
    res
      .status(OK)
      .json({ message: "successfuly list posr like", like: response });
  } catch (error) {
    console.log("Failed to list post like", error.message);
    return next(error);
  }
};
