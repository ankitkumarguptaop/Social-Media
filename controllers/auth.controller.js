
const { INTERNAL_SERVER_ERROR, OK } = require("../libs/constants");
const {authService}  =require("../services")

exports.signUp = async (req, res) => {
    try {
      const response = await authService.signUp({
        body:req.body,
        file:req.file
      });
      res
        .status(OK)
        .json({ message: "successfuly created user", user: response });
    } catch (error) {
      console.log("Failed to create user", error.message);
      res.status(error.statusCode || INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  };


  exports.signIn = async (req, res) => {
    try {
      const response = await authService.signIn({
        body:req.body
      });
      const cookieOptions = {
        secure: true,
        httpOnly: true,
      };
      const {token} = response;
      
      res.cookie("jwt",token, cookieOptions)
        .status(OK)
        .json({ message: "successfuly Singin user", user: response });
    } catch (error) {
      console.log("Failed to Singin user", error.message);
      res.status(error.statusCode || INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  };