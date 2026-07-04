const express = require("express");

const router = express.Router();

const lostController = require("../controllers/lostController");
const upload = require("../config/multer");

// Add Lost Item
router.get("/add-lost", lostController.showAddLostPage);

// Add Lost Item with Image Upload
router.post(
    "/add-lost",
    upload.single("image"),
    lostController.addLostItem
);

// View Items
router.get("/lost-items", lostController.showLostItems);

// Delete
router.get("/delete-lost/:id", lostController.deleteLostItem);

module.exports = router;