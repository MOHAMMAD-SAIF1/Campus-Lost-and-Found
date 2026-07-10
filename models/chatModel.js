const db = require("../config/database");

// Save Message
exports.sendMessage = (message, callback) => {

    db.run(

        `INSERT INTO messages
        (sender_id,receiver_id,message)
        VALUES(?,?,?)`,

        [
            message.sender_id,
            message.receiver_id,
            message.message
        ],

        callback

    );

};

// Get Conversation
exports.getConversation = (sender, receiver, callback) => {

    db.all(

        `
        SELECT *
        FROM messages
        WHERE

        (sender_id=? AND receiver_id=?)

        OR

        (sender_id=? AND receiver_id=?)

        ORDER BY created_at ASC
        `,

        [
            sender,
            receiver,
            receiver,
            sender
        ],

        callback

    );

};