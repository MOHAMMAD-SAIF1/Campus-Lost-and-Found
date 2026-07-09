const Notification = require("../models/notificationModel");

// Show Notifications
exports.showNotifications = (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    Notification.getUserNotifications(

        req.session.user.id,

        (err, notifications) => {

            if (err) {
                return res.send(err.message);
            }

            res.render("notification", {

                title: "Notifications",

                notifications

            });

        }

    );

};