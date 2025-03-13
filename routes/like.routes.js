const express = require("express");
const { likeController } = require("../controllers");
const router = express.Router();

router.get("/posts/:postId", likeController.listPostLike);
router.get("/comments/:commentId", likeController.listCommentLike);
router.post("/posts/:postId", likeController.addLikeOnPost);
router.post("/comments/:commentId", likeController.addLikeOnComment);
router.delete("/posts/:postId", likeController.removePostLike);
router.delete("/comments/:commentId", likeController.removeCommentLike);

module.exports = router;
