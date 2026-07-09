const db = require("../config/database");

// Create Notification
exports.createNotification = (notification, callback) => {

    db.run(
        `INSERT INTO notifications
        (user_id, message, item_id)
        VALUES (?, ?, ?)`,
        [
            notification.user_id,
            notification.message,
            notification.item_id
        ],
        callback
    );

};

// Get Notifications of a User
exports.getUserNotifications = (userId, callback) => {

    db.all(
        `SELECT *
         FROM notifications
         WHERE user_id = ?
         ORDER BY created_at DESC`,
        [userId],
        callback
    );

};

// Mark Notification as Read
exports.markAsRead = (id, callback) => {

    db.run(
        `UPDATE notifications
         SET is_read = 1
         WHERE id = ?`,
        [id],
        callback
    );

};