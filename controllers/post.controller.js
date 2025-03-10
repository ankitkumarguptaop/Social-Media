

const { INTERNAL_SERVER_ERROR, OK } = require("../libs/constants");
const {postService}  =require("../services")

exports.createPost = async (req, res) => {
  console.log(req.files)
    try {
      const response = await postService.createPost({
        body:req.body,
        files:req.files,
        user:req.user
      });
      res
        .status(OK)
        .json({ message: "successfuly created post", post: response });
    } catch (error) {
      console.log("Failed to create post", error.message);
      res.status(error.statusCode || INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  };

  exports.deletePost = async (req, res) => {
    try {
      const response = await postService.deletePost({
        body:req.body,
        user:req.user
      });
      res
        .status(OK)
        .json({ message: "successfuly created post", post: response });
    } catch (error) {
      console.log("Failed to create post", error.message);
      res.status(error.statusCode || INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  };


  exports.listPost = async (req, res) => {
    try {
      const response = await postService.listPost();
      res
        .status(OK)
        .json({ message: "successfuly list post", post: response });
    } catch (error) {
      console.log("Failed to create post", error.message);
      res.status(error.statusCode || INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  };


  exports.listUserPost = async (req, res) => {
    try {
      const response = await postService.listUserPost({
        user:req.user
      });
      res
        .status(OK)
        .json({ message: "successfuly list post", post: response });
    } catch (error) {
      console.log("Failed to create post", error.message);
      res.status(error.statusCode || INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  };


  exports.deletePost = async (req, res) => {
    try {
      const response = await postService.deletePost({
        user:req.user,
        params:req.params
      });
      res
        .status(OK)
        .json({ message: "successfuly deleted post", post: response });
    } catch (error) {
      console.log("Failed to delete post", error.message);
      res.status(error.statusCode || INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  };



  
  exports.updatePost = async (req, res) => {
    try {
      const response = await postService.updatePost({
        body:req.body,
        user:req.user,
        params:req.params
      });
      res
        .status(OK)
        .json({ message: "successfuly updated post", post: response });
    } catch (error) {
      console.log("Failed to update post", error.message);
      res.status(error.statusCode || INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  };
