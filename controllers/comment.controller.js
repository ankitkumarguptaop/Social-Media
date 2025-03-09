const { INTERNAL_SERVER_ERROR, OK } = require("../libs/constants");
const {commentService}  =require("../services")

exports.addcommentOnPost= async (req, res) => {
    try {
      const response = await commentService.addcommentOnPost({
        body:req.body,
        paams:req.params,
        user:req.user
      });
      res
        .status(OK)
        .json({ message: "successfuly comment on  post", like: response });
    } catch (error) {
      console.log("Failed to comment on post", error.message);
      res.status(error.statusCode || INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  };


  exports.addCommentOnComment= async (req, res) => {
    try {
      const response = await commentService.addCommentOnComment({
        body:req.body,
        user:req.user,
        params:req.params
      });
      res
        .status(OK)
        .json({ message: "successfuly comment on comment ", like: response });
    } catch (error) {
      console.log("Failed to do comment", error.message);
      res.status(error.statusCode || INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  };


  exports.deleteComment = async (req, res) => {
    try {
      const response = await commentService.deleteComment({
        params:req.params,
        body:req.body,
        user:req.user
      });
      res
        .status(OK)
        .json({ message: "successfuly deleted comment", like: response });
    } catch (error) {
      console.log("Failed to delete comment", error.message);
      res.status(error.statusCode || INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  };

  exports.updateComment = async (req, res) => {
    try {
      const response = await commentService.updateComment({
        params:req.params,
        body:req.body,
        user:req.user
      });
      res
        .status(OK)
        .json({ message: "successfuly updated comment", like: response });
    } catch (error) {
      console.log("Failed to update comment", error.message);
      res.status(error.statusCode || INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  };





  