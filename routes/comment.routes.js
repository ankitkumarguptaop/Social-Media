const express = require("express");
const { commentController } = require("../controllers");

const router = express.Router();

router.post("/posts/:postId", commentController.addComment);
router.patch("/commentId", commentController.updateComment);
router.delete("/commentId", commentController.deleteComment);

module.exports = router;
