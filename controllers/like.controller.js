const { INTERNAL_SERVER_ERROR, OK } = require("../libs/constants");

const { likeService } = require("../services");

exports.addLikeOnComment = async (req, res) => {
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
    res
      .status(error.statusCode || INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

exports.addLikeOnPost = async (req, res) => {
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
    res
      .status(error.statusCode || INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

exports.removeCommentLike = async (req, res) => {
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
    res
      .status(error.statusCode || INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

exports.removePostLike = async (req, res) => {
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
    res
      .status(error.statusCode || INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

exports.listPostLike = async (req, res) => {
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
    res
      .status(error.statusCode || INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

exports.listCommentLike = async (req, res) => {
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
    res
      .status(error.statusCode || INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
