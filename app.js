require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");

require("./config/database");
require("./database/initDatabase");

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const lostRoutes = require("./routes/lostRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const foundRoutes = require("./routes/foundRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const chatRoutes = require("./routes/chatRoutes");
const claimRoutes = require("./routes/claimRoutes");

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
);

// Make logged-in user available in all EJS views
app.use((req, res, next) => {

    res.locals.user = req.session.user || null;

    next();

});

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Home Route
app.get("/", (req, res) => {
    res.render("index", {
        title: "Campus Lost & Found"
    });
});

// Authentication Routes
app.use(authRoutes);
app.use(userRoutes);
app.use(lostRoutes);
app.use(dashboardRoutes);
app.use(foundRoutes);
app.use(notificationRoutes);
app.use(chatRoutes);
app.use(claimRoutes);


// Temporary Routes

app.get("/notifications", (req, res) => {
    res.render("notification", {
        title: "Notifications"
    });
});

app.get("/admin", (req, res) => {
    res.render("adminDashboard", {
        title: "Admin Dashboard"
    });
});

// 404 Page
app.use((req, res) => {
    res.status(404).send("404 - Page Not Found");
});

module.exports = app;