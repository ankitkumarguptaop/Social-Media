const { INTERNAL_SERVER_ERROR, OK } = require("../libs/constants");
const { userService } = require("../services");

exports.updateUser = async (req, res) => {
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
    res
      .status(error.statusCode || INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const response = await userService.deleteUser({
      user: req.user,
    });
    res
      .status(OK)
      .json({ message: "successfuly deleted user", user: response });
  } catch (error) {
    console.log("Failed to delete user", error.message);
    res
      .status(error.statusCode || INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
