const express = require("express");
const { likeController } = require("../controllers");
const {authMiddleware} = require('../middlewares');
const router = express.Router();

router.post("comments/commentId", authMiddleware.jwtTokenValidation, likeController.addLikeOnComment);
router.post("posts/postId", authMiddleware.jwtTokenValidation, likeController.addLikeOnPost);
router.delete("posts/postId", authMiddleware.jwtTokenValidation, likeController.removePostlike);
router.delete("comments/commentId", authMiddleware.jwtTokenValidation, likeController.removeCommentlike);

module.exports = router;
