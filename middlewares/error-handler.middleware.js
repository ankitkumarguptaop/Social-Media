const { ValidationError, INTEGER } = require("sequelize");
const {
  Success,
  NotFound,
  BadRequest,
  NoContent,
  ForBidden,
  UnAuthorized,
} = require("../libs/errors");
const { INTERNAL_SERVER_ERROR, BAD_REQUEST } = require("../libs/constants");

exports.errorHandler = (error, req, res, next) => {
  switch (true) {
    case error instanceof Success:
      res.status(error.statusCode).json({ message: error.message });
      break;
    case error instanceof NotFound:
      res.status(error.statusCode).json({ message: error.message });
      break;
    case error instanceof BadRequest:
      console.log(error);
      res.status(error.statusCode).json({ message: error.message });
      break;
    case error instanceof NoContent:
      res.status(error.statusCode).json({ message: error.message });
      break;
    case error instanceof ForBidden:
      res.status(error.statusCode).json({ message: error.message });
      break;
    case error instanceof UnAuthorized:
      res.status(error.statusCode).json({ message: error.message });
      break;
    case error instanceof ValidationError:
      res.status(BAD_REQUEST).json({ error: error.message });
      break;
    default:
      res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
