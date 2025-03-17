const express = require("express");
const {messageController } = require("../controllers");

const router = express.Router();

router.get("/chats/:chatId", messageController.listMessage);
router.post("/chats/:chatId", messageController.createMessage);

module.exports = router;
