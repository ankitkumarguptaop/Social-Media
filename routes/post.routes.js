const express = require("express");
const { postController } = require("../controllers");
const {imageUpload } = require('../middlewares');
const router = express.Router();

router.post("/",imageUpload.uplaod().fields([{name:'postImages'}]), postController.createPost);
router.get("/users", postController.listUserPost);
router.get("/", postController.listPost);
router.patch("/postId", postController.updatePost);
router.delete("/postId", postController.deletePost);

module.exports = router;
