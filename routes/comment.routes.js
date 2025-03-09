const express = require("express");
const { commentController } = require("../controllers");
const {authMiddleware} = require('../middlewares');

const router = express.Router();

router.post("/posts/postId",authMiddleware.jwtTokenValidation,commentController.addcommentOnPost);
router.post("/posts/postId/comments/commentId",authMiddleware.jwtTokenValidation, commentController.addCommentOnComment);
router.patch("/comments/commentId", authMiddleware.jwtTokenValidation, commentController.updateComment);
router.delete("/comments/commentId",authMiddleware.jwtTokenValidation, commentController.deleteComment);

module.exports = router;
