const User = require("../models/userModel");

// Show Profile
exports.showProfile = (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    User.getUserById(req.session.user.id, (err, user) => {

        if (err) {
            return res.send(err.message);
        }

        res.render("profile", {
            title: "My Profile",
            user
        });

    });

};

// Update Profile
exports.updateProfile = (req, res) => {

    const data = {

        id: req.session.user.id,
        full_name: req.body.full_name,
        phone: req.body.phone

    };

    User.updateProfile(data, (err) => {

        if (err) {
            return res.send(err.message);
        }

        req.session.user.full_name = data.full_name;

        res.redirect("/profile");

    });

};