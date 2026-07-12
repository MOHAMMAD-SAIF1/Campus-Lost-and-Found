const Claim = require("../models/claimModel");
const LostItem = require("../models/lostItemModel");
const FoundItem = require("../models/foundItemModel");
const Notification = require("../models/notificationModel");

// Submit Claim
exports.submitClaim = (req, res) => {

    if (!req.session.user) {

        return res.redirect("/login");

    }

    Claim.createClaim({

        lost_item_id: req.body.lost_item_id,

        found_item_id: req.body.found_item_id,

        claimant_id: req.session.user.id,

        finder_id: req.body.finder_id,

        proof: req.body.proof

    }, (err) => {

        if (err) {

            return res.send(err.message);

        }

        res.redirect("/dashboard");

    });

};

// Finder Dashboard
exports.showClaims = (req, res) => {

    Claim.getClaimsForFinder(

        req.session.user.id,

        (err, claims) => {

            if (err) {

                return res.send(err.message);

            }

            res.render("claims", {

                title: "Claim Requests",

                claims

            });

        }

    );

};

// Approve Claim
exports.approveClaim = (req, res) => {

    Claim.getClaimById(req.params.id, (err, claim) => {

        if (err) {
            return res.send(err.message);
        }

        Claim.updateClaimStatus(claim.id, "Approved", (err) => {

            if (err) {
                return res.send(err.message);
            }

            LostItem.updateStatus(claim.lost_item_id, "Returned", (err) => {

                if (err) {
                    return res.send(err.message);
                }

                FoundItem.updateStatus(claim.found_item_id, "Returned", (err) => {

                    if (err) {
                        return res.send(err.message);
                    }

                    Notification.createNotification({

                        user_id: claim.claimant_id,

                        message: "🎉 Your claim has been approved!",

                        item_id: claim.lost_item_id

                    }, (err) => {

                        if (err) {
                            return res.send(err.message);
                        }

                        res.redirect("/claims");

                    });

                });

            });

        });

    });

};

// Reject Claim
exports.rejectClaim = (req, res) => {

    Claim.getClaimById(req.params.id, (err, claim) => {

        if (err) {
            return res.send(err.message);
        }

        Claim.updateClaimStatus(claim.id, "Rejected", (err) => {

            if (err) {
                return res.send(err.message);
            }

            Notification.createNotification({

                user_id: claim.claimant_id,

                message: "❌ Your claim has been rejected.",

                item_id: claim.lost_item_id

            }, (err) => {

                if (err) {
                    return res.send(err.message);
                }

                res.redirect("/claims");

            });

        });

    });

};