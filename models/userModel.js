const db = require("../config/database");

// Find User by Email
const findUserByEmail = (email, callback) => {

    db.get(
        "SELECT * FROM users WHERE email = ?",
        [email],
        callback
    );

};

// Create User
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

// Get User By ID
const getUserById = (id, callback) => {

    db.get(
        "SELECT * FROM users WHERE id = ?",
        [id],
        callback
    );

};

// Update Profile
const updateProfile = (user, callback) => {

    db.run(
        `
        UPDATE users
        SET
            full_name = ?,
            phone = ?
        WHERE id = ?
        `,
        [
            user.full_name,
            user.phone,
            user.id
        ],
        callback
    );

};

// Total Users
const getTotalUsers = (callback) => {

    db.get(
        "SELECT COUNT(*) AS total FROM users",
        callback
    );

};

module.exports = {

    findUserByEmail,
    createUser,
    getUserById,
    updateProfile,
    getTotalUsers

};