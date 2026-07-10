const express = require("express");

const router = express.Router();

const chatController =
require("../controllers/chatController");

router.get(

    "/chat/:id",

    chatController.showChat

);

router.post(

    "/chat/:id",

    chatController.sendMessage

);

module.exports = router;