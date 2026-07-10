const Chat = require("../models/chatModel");

// Chat Page
exports.showChat = (req, res) => {

    if (!req.session.user) {

        return res.redirect("/login");

    }

    const receiverId = req.params.id;

    Chat.getConversation(

        req.session.user.id,

        receiverId,

        (err, messages) => {

            if (err) {

                return res.send(err.message);

            }

            res.render("chat", {

                title: "Chat",

                receiverId,

                messages,

                user: req.session.user

            });

        }

    );

};

// Send Message
exports.sendMessage = (req, res) => {

    Chat.sendMessage({

        sender_id: req.session.user.id,

        receiver_id: req.params.id,

        message: req.body.message

    }, (err) => {

        if (err) {

            return res.send(err.message);

        }

        res.redirect("/chat/" + req.params.id);

    });

};