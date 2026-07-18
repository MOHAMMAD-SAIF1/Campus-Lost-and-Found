const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS

    }

});

exports.sendMail = async (to, subject, html) => {

    try {

        await transporter.sendMail({

            from: `"Campus Lost & Found" <${process.env.EMAIL_USER}>`,

            to,

            subject,

            html

        });

        console.log("✅ Email Sent");

    }

    catch (err) {

        console.log("Email Error:", err);

    }

};