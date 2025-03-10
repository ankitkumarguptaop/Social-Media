const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares");

router.use("/auth", require("./auth.routes"));
router.use(
  "/users",
  authMiddleware.jwtTokenValidation,
  require("./user.routes")
);
router.use(
  "/posts",
  authMiddleware.jwtTokenValidation,
  require("./post.routes")
);
router.use(
  "/likes",
  authMiddleware.jwtTokenValidation,
  require("./like.routes")
);
router.use(
  "/comments",
  authMiddleware.jwtTokenValidation,
  require("./comment.routes")
);

module.exports = router;
