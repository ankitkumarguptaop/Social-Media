const express = require("express");
const { likeController } = require("../controllers");
const router = express.Router();

router.post("/posts/:postId", likeController.addLike);
router.delete("/posts/:postId", likeController.removeLike);


module.exports = router;
