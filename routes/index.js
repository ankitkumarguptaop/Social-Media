const express = require("express");
const router = express.Router();
const {authMiddleware  } = require('../middlewares');

router.use("/auth", require("./auth.routes"));
router.use("/users", require("./user.routes"));
router.use("/posts", require("./post.routes"));
router.use("/likes", require("./like.routes"));
router.use("/comments", require("./comment.routes"));

module.exports = router;