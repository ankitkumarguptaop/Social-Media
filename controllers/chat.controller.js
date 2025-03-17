const { OK } = require("../libs/constants");
const { chatService } = require("../services");

exports.listChat = async (req, res, next) => {
  try {
    const response = await chatService.listChat({
      user: req.user,
    });
    res.status(OK).json({ message: "successfuly list chat", chats: response });
  } catch (error) {
    console.log("Failed to list chat", error.message);
    return next(error);
  }
};

exports.createChat = async (req, res, next) => {
  try {
    const response = await chatService.createChat({
      params: req.params,
      body: req.body,
      user: req.user,
      query: req.query,
    });
    res.status(OK).json({ message: "successfuly create chat", chat: response });
  } catch (error) {
    console.log("Failed to create chat", error.message);
    return next(error);
  }
};
