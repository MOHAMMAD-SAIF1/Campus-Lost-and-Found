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

// Search Lost Items
router.get("/search-lost", lostController.searchLostItems);

// View Items
router.get("/lost-items", lostController.showLostItems);

// =======================
// Edit Lost Item
// =======================

// Show Edit Page
router.get(
    "/edit-lost/:id",
    lostController.showEditLostPage
);

// Update Lost Item
router.post(
    "/edit-lost/:id",
    upload.single("image"),
    lostController.updateLostItem
);


// Delete
router.get("/delete-lost/:id", lostController.deleteLostItem);

module.exports = router;