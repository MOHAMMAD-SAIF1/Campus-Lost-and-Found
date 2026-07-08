const db = require("../config/database");

// Add Lost Item
exports.createLostItem = (item, callback) => {

    const sql = `
        INSERT INTO lost_items
        (user_id,title,category,description,location,image,lost_date,status)
        VALUES(?,?,?,?,?,?,?,?)
    `;

    db.run(sql, [
        item.user_id,
        item.title,
        item.category,
        item.description,
        item.location,
        item.image,
        item.lost_date,
        "Lost"
    ], callback);

};

// Get All Lost Items
exports.getAllLostItems = (callback) => {

    const sql = `
        SELECT
            lost_items.*,
            users.full_name
        FROM lost_items
        JOIN users
        ON users.id = lost_items.user_id
        ORDER BY lost_items.id DESC
    `;

    db.all(sql, callback);

};

// Get One Lost Item
exports.getLostItemById = (id, callback) => {

    db.get(
        "SELECT * FROM lost_items WHERE id=?",
        [id],
        callback
    );

};

// Delete Lost Item
exports.deleteLostItem = (id, callback) => {

    db.run(
        "DELETE FROM lost_items WHERE id=?",
        [id],
        callback
    );

};


// Update Lost Item
exports.updateLostItem = (item, callback) => {

    const sql = `
        UPDATE lost_items
        SET
            title = ?,
            category = ?,
            description = ?,
            location = ?,
            image = ?
        WHERE id = ?
    `;

    db.run(
        sql,
        [
            item.title,
            item.category,
            item.description,
            item.location,
            item.image,
            item.id
        ],
        callback
    );

};

// Search Lost Items
exports.searchLostItems = (keyword, callback) => {

    const sql = `
        SELECT
            lost_items.*,
            users.full_name
        FROM lost_items
        JOIN users
        ON users.id = lost_items.user_id
        WHERE
            title LIKE ?
            OR category LIKE ?
            OR location LIKE ?
        ORDER BY lost_items.id DESC
    `;

    const search = `%${keyword}%`;

    db.all(sql, [search, search, search], callback);

};