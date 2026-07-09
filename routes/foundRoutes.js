const express = require("express");

const router = express.Router();

const foundController = require("../controllers/foundController");

// Show Add Found Item Page
router.get("/add-found", foundController.showAddFoundPage);

// Add Found Item
router.post("/add-found", foundController.addFoundItem);

// View All Found Items
router.get("/found-items", foundController.showFoundItems);

// Delete Found Item
router.get("/delete-found/:id", foundController.deleteFoundItem);


router.get(
    "/search-found",
    foundController.searchFoundItems
);

module.exports = router;