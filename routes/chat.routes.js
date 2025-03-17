const express = require("express");
const { chatController } = require("../controllers");

const router = express.Router();

router.get("/", chatController.listChat);
router.post("/", chatController.createChat);

module.exports = router;
