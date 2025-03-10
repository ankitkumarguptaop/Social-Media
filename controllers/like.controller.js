const { INTERNAL_SERVER_ERROR, OK } = require("../libs/constants");

const { likeService } = require("../services");

exports.addLike = async (req, res) => {
  try {
    const response = await likeService.addLike({
      body: req.body,
      params: req.params,
      query:req.query,
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



exports.removeLike = async (req, res) => {
  try {
    const response = await likeService.removeLike({
      body: req.body,
      user: req.user,
      params:req.params,
      query:req.query,
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

