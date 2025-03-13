const jwt = require("jsonwebtoken");

const { userRepository } = require("../repositories");
const { UnAuthorized } = require("../libs/errors");

exports.jwtTokenValidation = async (req, res, next) => {
  try {
    let token = req?.cookies?.jwt;
    if (token) {
      const authenticatedUser = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await userRepository.findOne({ id: authenticatedUser.id });
      next();
      console.log("successfully authenticate");
    } else {
      throw new UnAuthorized("No Token");
    }
  } catch (error) {
     return  next(error)
  }
};
