require("dotenv").config();

const express = require("express");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");

require("./config/database");
require("./database/initDatabase");

// Routes
const authRoutes = require("./routes/authRoutes");
const lostRoutes = require("./routes/lostRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

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
app.use(lostRoutes);
app.use(dashboardRoutes);

// Temporary Routes

app.get("/found-items", (req, res) => {
    res.render("foundItems", {
        title: "Found Items"
    });
});



app.get("/profile", (req, res) => {
    res.render("profile", {
        title: "Profile"
    });
});


app.get("/add-found", (req, res) => {
    res.render("addFound", {
        title: "Report Found Item"
    });
});

app.get("/chat", (req, res) => {
    res.render("chat", {
        title: "Chat"
    });
});

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