const db = require("../config/database");

// Find user by email
const findUserByEmail = (email, callback) => {
    db.get(
        "SELECT * FROM users WHERE email = ?",
        [email],
        callback
    );
};

// Create a new user
const createUser = (user, callback) => {

    const sql = `
        INSERT INTO users
        (full_name,email,password,phone)
        VALUES(?,?,?,?)
    `;

    db.run(
        sql,
        [
            user.full_name,
            user.email,
            user.password,
            user.phone
        ],
        callback
    );
};

module.exports = {

    findUserByEmail,

    createUser

};