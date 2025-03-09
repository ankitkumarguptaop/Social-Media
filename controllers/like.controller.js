

const { INTERNAL_SERVER_ERROR, OK } = require("../libs/constants");
const { param } = require("../routes");

const {likeService}  =require("../services")

exports.addLikeOnPost= async (req, res) => {
    try {
      const response = await likeService.addLikeOnPost({
        body:req.body,
        paams:req.params,
        user:req.user
      });
      res
        .status(OK)
        .json({ message: "successfuly liked  post", like: response });
    } catch (error) {
      console.log("Failed to liked post", error.message);
      res.status(error.statusCode || INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  };


  exports.addLikeOnComment= async (req, res) => {
    try {
      const response = await likeService.addLikeOnComment({
        body:req.body,
        user:req.user,
        params:req.params
      });
      res
        .status(OK)
        .json({ message: "successfuly liked on comment ", like: response });
    } catch (error) {
      console.log("Failed to add like", error.message);
      res.status(error.statusCode || INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  };


  exports.removeCommentlike = async (req, res) => {
    try {
      const response = await likeService.removelike({
        body:req.body,
        user:req.user
      });
      res
        .status(OK)
        .json({ message: "successfuly removed comment like", like: response });
    } catch (error) {
      console.log("Failed to removed comment like", error.message);
      res.status(error.statusCode || INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  };

  exports.removePostlike = async (req, res) => {
    try {
      const response = await likeService.removelike({
        body:req.body,
        user:req.user
      });
      res
        .status(OK)
        .json({ message: "successfuly remove post like", like: response });
    } catch (error) {
      console.log("Failed to remove post like", error.message);
      res.status(error.statusCode || INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  };





  