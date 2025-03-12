const { OK } = require("../libs/constants");
const { postService } = require("../services");

exports.createPost = async (req, res, next) => {
  try {
    const response = await postService.createPost({
      body: req.body,
      files: req.files,
      user: req.user,
    });
    res
      .status(OK)
      .json({ message: "successfuly created post", post: response });
  } catch (error) {
    return next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const response = await postService.deletePost({
      body: req.body,
      user: req.user,
    });
    res
      .status(OK)
      .json({ message: "successfuly created post", post: response });
  } catch (error) {
    console.log("Failed to create post", error);
    return next(error);
  }
};

exports.listPost = async (req, res) => {
  try {
    const response = await postService.listPost({ query: req.query });
    res.status(OK).json({ message: "successfuly list post", post: response });
  } catch (error) {
    console.log("Failed to create post", error);
    return next(error);
  }
};

exports.listUserPost = async (req, res, next) => {
  try {
    const response = await postService.listUserPost({
      user: req.user,
      query: req.query,
    });
    res.status(OK).json({ message: "successfuly list post", post: response });
  } catch (error) {
    console.log("Failed to create post", error.message);
    return next(error);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const response = await postService.deletePost({
      user: req.user,
      params: req.params,
    });
    res
      .status(OK)
      .json({ message: "successfuly deleted post", post: response });
  } catch (error) {
    console.log("Failed to delete post", error.message);
    next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const response = await postService.updatePost({
      body: req.body,
      user: req.user,
      params: req.params,
    });
    res
      .status(OK)
      .json({ message: "successfuly updated post", post: response });
  } catch (error) {
    console.log("Failed to update post", error.message);
    next(error);
  }
};
