const express = require("express");
const { commentController } = require("../controllers");

const router = express.Router();

router.get("/posts/:postId", commentController.listPostComment);
router.get("/:commentId", commentController.listCommentComment);
router.post("/posts/:postId", commentController.addCommentOnPost);
router.post("/:commentId", commentController.addCommentOnComment);
router.patch("/:commentId", commentController.updateComment);
router.delete("/:commentId", commentController.deleteComment);

module.exports = router;
