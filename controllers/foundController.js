const FoundItem = require("../models/foundItemModel");
const LostItem = require("../models/lostItemModel");
const Notification = require("../models/notificationModel");


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

        // Check all lost items
        LostItem.getAllLostItems((err, lostItems) => {

            if (err) {
                return res.redirect("/found-items");
            }

            lostItems.forEach(lost => {

                let score = 0;

                // Category Match
                if (
                    lost.category.toLowerCase() ===
                    item.category.toLowerCase()
                ) {
                    score += 40;
                }

                // Location Match
                if (
                    lost.location.toLowerCase() ===
                    item.location.toLowerCase()
                ) {
                    score += 30;
                }

                // Title Match
                if (
                    lost.title.toLowerCase().includes(item.title.toLowerCase()) ||
                    item.title.toLowerCase().includes(lost.title.toLowerCase())
                ) {
                    score += 30;
                }

                // If score is high enough, create notification
                if (score >= 50) {

                    Notification.createNotification({

                        user_id: lost.user_id,

                        message:
                            `Possible match found for "${lost.title}" (${score}% match)`,

                        item_id: lost.id

                    }, () => {});

                }

            });

            res.redirect("/found-items");

        });

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

// Search Found Items
exports.searchFoundItems = (req, res) => {

    const keyword = req.query.keyword;

    FoundItem.searchFoundItems(keyword, (err, items) => {

        if (err) {
            return res.send(err.message);
        }

        res.render("foundItems", {
            title: "Found Items",
            items,
            keyword
        });

    });

};


// View Found Item Details
exports.viewFoundItem = (req, res) => {

    FoundItem.getFoundItemById(req.params.id, (err, item) => {

        if (err) return res.send(err.message);

        if (!item) return res.send("Item not found");

        res.render("foundDetails", {

            title: "Found Item Details",

            item,

            user: req.session.user

        });

    });

};

// Show Edit Page
exports.editFoundPage = (req, res) => {

    FoundItem.getFoundItemById(req.params.id, (err, item) => {

        if (err) return res.send(err.message);

        if (!item) return res.send("Item not found");

        res.render("editFound", {

            title: "Edit Found Item",

            item

        });

    });

};

// Update Found Item
exports.updateFoundItem = (req, res) => {

    FoundItem.getFoundItemById(req.params.id, (err, oldItem) => {

        if (err) return res.send(err.message);

        const updatedItem = {

            id: req.params.id,

            title: req.body.title,

            category: req.body.category,

            description: req.body.description,

            location: req.body.location,

            image: req.file
                ? req.file.filename
                : oldItem.image

        };

        FoundItem.updateFoundItem(updatedItem, (err) => {

            if (err) return res.send(err.message);

            res.redirect("/found-items");

        });

    });

};



// Show Single Found Item
exports.showFoundItem = (req, res) => {

    FoundItem.getFoundItemById(req.params.id, (err, item) => {

        if (err) return res.send(err.message);

        if (!item) {
            return res.send("Item not found");
        }

        res.render("foundItemDetails", {

            title: "Found Item",

            item,

            user: req.session.user

        });

    });

};


// Show Edit Page
exports.showEditFoundPage = (req, res) => {

    FoundItem.getFoundItemById(req.params.id, (err, item) => {

        if (err) return res.send(err.message);

        res.render("editFound", {

            title: "Edit Found Item",

            item

        });

    });

};


// Update Found Item
exports.updateFoundItem = (req, res) => {

    const item = {

        id: req.params.id,

        title: req.body.title,

        category: req.body.category,

        description: req.body.description,

        location: req.body.location

    };

    FoundItem.updateFoundItem(item, (err) => {

        if (err) return res.send(err.message);

        res.redirect("/found-items");

    });

};