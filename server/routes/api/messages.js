const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");
const jwt = require("jsonwebtoken");
const { User } = require("../../db/models");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }

    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender } = req.body;

    const token = req.cookies["JWT"];
    if (token) {
      jwt.verify(token, process.env.SESSION_SECRET, (err, decoded) => {
        if (err) {
          return next();
        }
        User.findOne({
          where: { id: decoded.id },
        }).then(async (user) => {
          if (user.dataValues.id !== sender.id) {
            res.sendStatus(403);
          } else {
            // if we already know conversation id, we can save time and just add it to message and return
            if (conversationId) {
              const message = await Message.create({
                senderId,
                text,
                conversationId,
              });
              return res.json({ message, sender });
            }
            // if we don't have conversation id, find a conversation to make sure it doesn't already exist
            let conversation = await Conversation.findConversation(
              senderId,
              recipientId
            );

            if (!conversation) {
              // create conversation
              conversation = await Conversation.create({
                user1Id: senderId,
                user2Id: recipientId,
              });
              if (onlineUsers.includes(sender.id)) {
                sender.online = true;
              }
            }
            const message = await Message.create({
              senderId,
              text,
              conversationId: conversation.id,
            });
            res.json({ message, sender });
          }
        });
      });
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
