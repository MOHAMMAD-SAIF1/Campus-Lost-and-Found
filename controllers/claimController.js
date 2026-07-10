const Claim = require("../models/claimModel");

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

// Approve
exports.approveClaim = (req, res) => {

    Claim.updateStatus(

        req.params.id,

        "Approved",

        () => {

            res.redirect("/claims");

        }

    );

};

// Reject
exports.rejectClaim = (req, res) => {

    Claim.updateStatus(

        req.params.id,

        "Rejected",

        () => {

            res.redirect("/claims");

        }

    );

};