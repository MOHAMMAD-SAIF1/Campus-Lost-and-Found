const fs = require("fs");
const path = require("path");
const db = require("../config/database");

const schemaPath = path.join(__dirname, "schema.sql");

const schema = fs.readFileSync(schemaPath, "utf8");

db.exec(schema, (err) => {
    if (err) {
        console.error("Database initialization failed:", err.message);
    } else {
        console.log("Database initialized successfully.");
    }
});