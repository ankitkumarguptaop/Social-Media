const { OK } = require("../libs/constants");
const { messageService } = require("../services");

exports.listMessage = async (req, res, next) => {
  try {
    const response = await messageService.listMessage({
      user: req.user,
      params: req.params,
    });
    res
      .status(OK)
      .json({ message: "successfuly list Message", messages: response });
  } catch (error) {
    console.log("Failed to list Message", error.message);
    return next(error);
  }
};

exports.createMessage = async (req, res, next) => {
  try {
    const response = await messageService.createMessage({
      user: req.user,
      params: req.params,
      body: req.body,
      query: req.query,
    });
    res
      .status(OK)
      .json({ message: "successfuly list Message", messages: response });
  } catch (error) {
    console.log("Failed to list Message", error.message);
    return next(error);
  }
};
