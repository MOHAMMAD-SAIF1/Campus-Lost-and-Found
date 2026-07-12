const User = require("../models/userModel");
const LostItem = require("../models/lostItemModel");
const FoundItem = require("../models/foundItemModel");
const Claim = require("../models/claimModel");

exports.dashboard = (req, res) => {

    // Check Login
    if (!req.session.user) {
        return res.redirect("/login");
    }

    // Check Admin
    if (req.session.user.role !== "admin") {
        return res.status(403).send("Access Denied");
    }

    User.getTotalUsers((err, users) => {

        if (err) return res.send(err.message);

        LostItem.getTotalLostItems((err, lost) => {

            if (err) return res.send(err.message);

            FoundItem.getTotalFoundItems((err, found) => {

                if (err) return res.send(err.message);

                Claim.getAllClaims((err, claims) => {

                    if (err) return res.send(err.message);

                    res.render("adminDashboard", {

                        title: "Admin Dashboard",

                        totalUsers: users.total,

                        totalLost: lost.total,

                        totalFound: found.total,

                        totalClaims: claims.length

                    });

                });

            });

        });

    });

};


// Show All Users
exports.showUsers = (req, res) => {

    if (!req.session.user || req.session.user.role !== "admin") {
        return res.status(403).send("Access Denied");
    }

    User.getAllUsers((err, users) => {

        if (err) {
            return res.send(err.message);
        }

        res.render("adminUsers", {

            title: "Manage Users",

            users,

            currentUser: req.session.user

        });

    });

};

// Delete User
exports.deleteUser = (req, res) => {

    if (Number(req.params.id) === req.session.user.id) {
        return res.send("You cannot delete your own account.");
    }

    User.deleteUser(req.params.id, (err) => {

        if (err) {
            return res.send(err.message);
        }

        res.redirect("/admin/users");

    });

};

// Change Role
exports.changeRole = (req, res) => {

    const role =
        req.params.role === "admin"
            ? "admin"
            : "user";

    User.updateRole(

        req.params.id,

        role,

        (err) => {

            if (err) {
                return res.send(err.message);
            }

            res.redirect("/admin/users");

        }

    );

};