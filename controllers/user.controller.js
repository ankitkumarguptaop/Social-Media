const { INTERNAL_SERVER_ERROR, OK } = require("../libs/constants");
const { userService } = require("../services");

exports.updateUser = async (req, res, next) => {
  try {
    const response = await userService.updateUser({
      body: req.body,
      user: req.user,
    });
    res
      .status(OK)
      .json({ message: "successfuly updated user", user: response });
  } catch (error) {
    console.log("Failed to update user", error.message);
    return next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const response = await userService.deleteUser({
      user: req.user,
    });
    res
      .status(OK)
      .json({ message: "successfuly deleted user", user: response });
  } catch (error) {
    console.log("Failed to delete user", error.message);
    return next(error);
  }
};

