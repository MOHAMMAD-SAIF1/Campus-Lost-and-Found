const User = require("../models/userModel");
const LostItem = require("../models/lostItemModel");
const FoundItem = require("../models/foundItemModel");

exports.dashboard = (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    User.getTotalUsers((err, users) => {

        if (err) return res.send(err.message);

        LostItem.getTotalLostItems((err, lost) => {

            if (err) return res.send(err.message);

            FoundItem.getTotalFoundItems((err, found) => {

                if (err) return res.send(err.message);

                // Get Recent Lost Items
                LostItem.getRecentLostItems((err, recentItems) => {

                    if (err) return res.send(err.message);

                    res.render("dashboard", {
                        title: "Dashboard",
                        user: req.session.user,
                        totalUsers: users.total,
                        totalLost: lost.total,
                        totalFound: found.total,
                        recentItems: recentItems
                    });

                });

            });

        });

    });

};