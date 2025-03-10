const { INTERNAL_SERVER_ERROR, OK } = require("../libs/constants");
const { commentService } = require("../services");

exports.addComment = async (req, res) => {
  
  try {
    const response = await commentService.addComment({
      body: req.body,
      params: req.params,
      query:req.query,
      user: req.user,
    });
    res
      .status(OK)
      .json({ message: "successfuly comment added", comment: response });
  } catch (error) {
    console.log("Failed to comment on post", error.message);
    res
      .status(error.statusCode || INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
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
    console.log("Failed to delete comment", error.message);
    res
      .status(error.statusCode || INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

exports.updateComment = async (req, res) => {
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
    res
      .status(error.statusCode || INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
