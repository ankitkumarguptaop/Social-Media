const express = require("express");
const { postController } = require("../controllers");
const {imageUpload ,authMiddleware} = require('../middlewares');
const router = express.Router();

router.post("/", authMiddleware.jwtTokenValidation,imageUpload.uplaod().fields([{name:'postImage'}]), postController.createPost);
router.get("/users", authMiddleware.jwtTokenValidation, postController.listUserPost);
router.get("/", authMiddleware.jwtTokenValidation, postController.listPost);
router.patch("/postId", authMiddleware.jwtTokenValidation, postController.updatePost);
router.delete("/postId", authMiddleware.jwtTokenValidation, postController.deletePost);

module.exports = router;
