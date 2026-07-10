const db = require("../config/database");

// Create Claim
exports.createClaim = (claim, callback) => {

    db.run(

        `INSERT INTO claims
        (lost_item_id,found_item_id,claimant_id,finder_id,proof)
        VALUES(?,?,?,?,?)`,

        [

            claim.lost_item_id,

            claim.found_item_id,

            claim.claimant_id,

            claim.finder_id,

            claim.proof

        ],

        callback

    );

};

// Get Claims for Finder
exports.getClaimsForFinder = (finderId, callback) => {

    db.all(

        `
        SELECT
        claims.*,
        users.full_name,
        lost_items.title

        FROM claims

        JOIN users
        ON users.id = claims.claimant_id

        JOIN lost_items
        ON lost_items.id = claims.lost_item_id

        WHERE finder_id=?

        ORDER BY claims.id DESC
        `,

        [finderId],

        callback

    );

};

// Update Status
exports.updateStatus = (id, status, callback) => {

    db.run(

        `UPDATE claims
        SET status=?
        WHERE id=?`,

        [

            status,

            id

        ],

        callback

    );

};