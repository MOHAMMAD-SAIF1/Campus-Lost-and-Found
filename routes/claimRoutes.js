const express = require("express");

const router = express.Router();

const claimController = require("../controllers/claimController");

// Submit Claim
router.post("/submit-claim", claimController.submitClaim);

// View Claims
router.get("/claims", claimController.showClaims);

// Approve Claim
router.get("/approve-claim/:id", claimController.approveClaim);

// Reject Claim
router.get("/reject-claim/:id", claimController.rejectClaim);

module.exports = router;