const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

// Pages
router.get("/login", authController.loginPage);
router.get("/register", authController.registerPage);

// Register
router.post("/register", authController.registerUser);

// Login
router.post("/login", authController.loginUser);

// Logout
router.get("/logout", authController.logout);

module.exports = router;