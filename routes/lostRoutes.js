const express = require("express");

const router = express.Router();

const lostController = require("../controllers/lostController");

// Add Lost Item
router.get("/add-lost", lostController.showAddLostPage);

router.post("/add-lost", lostController.addLostItem);

// View Items
router.get("/lost-items", lostController.showLostItems);

// Delete
router.get("/delete-lost/:id", lostController.deleteLostItem);

module.exports = router;