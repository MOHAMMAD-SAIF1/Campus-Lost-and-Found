const FoundItem = require("../models/foundItemModel");

// Show Add Found Item Page
exports.showAddFoundPage = (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    res.render("addFound", {
        title: "Report Found Item"
    });

};

// Add Found Item
exports.addFoundItem = (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    const item = {

        user_id: req.session.user.id,
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        location: req.body.location,
        image: "default-item.png",
        found_date: new Date().toISOString().split("T")[0]

    };

    FoundItem.createFoundItem(item, (err) => {

        if (err) {
            return res.send(err.message);
        }

        res.redirect("/found-items");

    });

};

// Show All Found Items
exports.showFoundItems = (req, res) => {

    FoundItem.getAllFoundItems((err, items) => {

        if (err) {
            return res.send(err.message);
        }

        res.render("foundItems", {
            title: "Found Items",
            items
        });

    });

};

// Delete Found Item
exports.deleteFoundItem = (req, res) => {

    FoundItem.deleteFoundItem(req.params.id, (err) => {

        if (err) {
            return res.send(err.message);
        }

        res.redirect("/found-items");

    });

};