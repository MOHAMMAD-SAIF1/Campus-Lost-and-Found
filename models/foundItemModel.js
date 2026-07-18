const db = require("../config/database");

// Add Found Item
exports.createFoundItem = (item, callback) => {

    const sql = `
        INSERT INTO found_items
        (user_id,title,category,description,location,image,found_date,status)
        VALUES(?,?,?,?,?,?,?,?)
    `;

    db.run(sql, [
        item.user_id,
        item.title,
        item.category,
        item.description,
        item.location,
        item.image,
        item.found_date,
        "Found"
    ], callback);

};

// Get All Found Items
exports.getAllFoundItems = (callback) => {

    const sql = `
        SELECT
            found_items.*,
            users.full_name
        FROM found_items
        JOIN users
        ON users.id = found_items.user_id
        ORDER BY found_items.id DESC
    `;

    db.all(sql, callback);

};

// Get One Found Item
exports.getFoundItemById = (id, callback) => {

    db.get(
        "SELECT * FROM found_items WHERE id=?",
        [id],
        callback
    );

};

// Delete Found Item
exports.deleteFoundItem = (id, callback) => {

    db.run(
        "DELETE FROM found_items WHERE id=?",
        [id],
        callback
    );

};


// Search Found Items
exports.searchFoundItems = (keyword, callback) => {

    const sql = `
        SELECT
            found_items.*,
            users.full_name
        FROM found_items
        JOIN users
        ON users.id = found_items.user_id
        WHERE
            title LIKE ?
            OR category LIKE ?
            OR location LIKE ?
        ORDER BY found_items.id DESC
    `;

    db.all(
        sql,
        [
            `%${keyword}%`,
            `%${keyword}%`,
            `%${keyword}%`
        ],
        callback
    );

};

// Total Found Items
exports.getTotalFoundItems = (callback) => {

    db.get(
        "SELECT COUNT(*) AS total FROM found_items",
        callback
    );

};


// Find Possible Matching Found Items
exports.findMatchingItems = (lostItem, callback) => {

    const sql = `
        SELECT *
        FROM found_items
    `;

    db.all(sql, (err, items) => {

        if (err) return callback(err);

        const matchedItems = items.map(item => {

            let score = 0;

            // Category Match
            if (
                item.category.toLowerCase() ===
                lostItem.category.toLowerCase()
            ) {
                score += 40;
            }

            // Location Match
            if (
                item.location
                    .toLowerCase()
                    .includes(lostItem.location.toLowerCase())
                ||
                lostItem.location
                    .toLowerCase()
                    .includes(item.location.toLowerCase())
            ) {
                score += 30;
            }

            // Title Match
            const lostWords = lostItem.title
                .toLowerCase()
                .split(" ");

            const foundWords = item.title
                .toLowerCase()
                .split(" ");

            const common = lostWords.filter(word =>
                foundWords.includes(word)
            );

            score += Math.min(common.length * 10, 30);

            return {

                ...item,

                matchScore: score

            };

        });

        matchedItems.sort((a, b) => b.matchScore - a.matchScore);

        callback(null, matchedItems);

    });

};


// Update Found Item Status
exports.updateStatus = (id, status, callback) => {

    db.run(
        `
        UPDATE found_items
        SET status = ?
        WHERE id = ?
        `,
        [status, id],
        callback
    );

};

exports.updateFoundItem = (item, callback) => {

    db.run(

        `UPDATE found_items
         SET
            title=?,
            category=?,
            description=?,
            location=?
         WHERE id=?`,

        [

            item.title,

            item.category,

            item.description,

            item.location,

            item.id

        ],

        callback

    );

};