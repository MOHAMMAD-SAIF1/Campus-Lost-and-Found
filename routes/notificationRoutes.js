const express = require("express");

const router = express.Router();

const notificationController = require("../controllers/notificationController");

router.get("/notifications", notificationController.showNotifications);

module.exports = router;