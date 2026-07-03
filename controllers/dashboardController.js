const db = require("../config/database");

exports.dashboard = (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    const userId = req.session.user.id;

    db.get(
        "SELECT COUNT(*) AS totalLost FROM lost_items WHERE user_id=?",
        [userId],
        (err, lostResult) => {

            if (err) return res.send(err.message);

            db.get(
                "SELECT COUNT(*) AS totalFound FROM found_items WHERE user_id=?",
                [userId],
                (err, foundResult) => {

                    if (err) return res.send(err.message);

                    db.all(
                        "SELECT * FROM lost_items WHERE user_id=? ORDER BY id DESC LIMIT 5",
                        [userId],
                        (err, recentItems) => {

                            if (err) return res.send(err.message);

                            res.render("dashboard", {

                                title: "Dashboard",

                                user: req.session.user,

                                totalLost: lostResult.totalLost,

                                totalFound: foundResult.totalFound,

                                recentItems

                            });

                        }
                    );

                }
            );

        }
    );

};