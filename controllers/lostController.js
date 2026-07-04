const LostItem = require("../models/lostItemModel");

// Show Add Lost Item Page
exports.showAddLostPage = (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    res.render("addLost", {
        title: "Report Lost Item"
    });

};

// Add Lost Item
exports.addLostItem = (req, res) => {

    if (!req.session.user) {
        return res.redirect("/login");
    }

    const item = {

        user_id: req.session.user.id,
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        location: req.body.location,
        image: req.file ? req.file.filename : "default-item.png",
        lost_date: new Date().toISOString().split("T")[0]

    };

    LostItem.createLostItem(item, (err) => {

        if (err) {
            return res.send(err.message);
        }

        res.redirect("/lost-items");

    });

};

// Show All Lost Items
exports.showLostItems = (req, res) => {

    LostItem.getAllLostItems((err, items) => {

        if (err) {
            return res.send(err.message);
        }

        res.render("lostItems", {
            title: "Lost Items",
            items
        });

    });

};

// Delete Lost Item
exports.deleteLostItem = (req, res) => {

    LostItem.deleteLostItem(req.params.id, (err) => {

        if (err) {
            return res.send(err.message);
        }

        res.redirect("/lost-items");

    });

};