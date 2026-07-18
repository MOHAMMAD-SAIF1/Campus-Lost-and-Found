const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const Email = require("../services/emailService");

// Register Page
exports.registerPage = (req, res) => {
    res.render("register", {
        title: "Register"
    });
};

// Login Page
exports.loginPage = (req, res) => {
    res.render("login", {
        title: "Login"
    });
};


//Register User
exports.registerUser = async (req, res) => {

    const { full_name, email, password, phone } = req.body;

    User.findUserByEmail(email, async (err, user) => {

        if (err) return res.send(err.message);

        if (user) {
            return res.send("Email already exists.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        User.createUser({
            full_name,
            email,
            password: hashedPassword,
            phone
        }, async (err) => {

            if (err)
                return res.send(err.message);

            // Send Welcome Email
            await Email.sendMail(

                email,

                "Welcome to Campus Lost & Found",

                `
                <h2>Welcome, ${full_name}! 👋</h2>

                <p>Your account has been created successfully.</p>

                <p>You can now:</p>

                <ul>
                    <li>Report Lost Items</li>
                    <li>Report Found Items</li>
                    <li>Submit Claims</li>
                    <li>Track Matches</li>
                </ul>

                <p>Thank you for using our platform.</p>

                <p><strong>Campus Lost & Found Team</strong></p>
                `

            );

            res.redirect("/login");

        });

    });

};

// LOGIN USER
exports.loginUser = (req, res) => {

    const { email, password } = req.body;

    User.findUserByEmail(email, async (err, user) => {

        if (err)
            return res.send(err.message);

        if (!user)
            return res.send("User not found");

        const match = await bcrypt.compare(password, user.password);

        if (!match)
            return res.send("Invalid Password");

        req.session.user = {

            id: user.id,

            full_name: user.full_name,

            email: user.email,

            role: user.role

        };

        res.redirect("/dashboard");

    });

};

// LOGOUT
exports.logout = (req, res) => {

    req.session.destroy(() => {

        res.redirect("/login");

    });

};