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
    const senderVerify = req.user.id;
    const { msgId, senderId, recipientId, read } = req.body;
    const token = req.cookies["JWT"];
    if (token) {
      jwt.verify(token, process.env.SESSION_SECRET, (err, decoded) => {
        if (err) {
          return next();
        }
        User.findOne({
          where: { id: decoded.id },
        }).then(async (user) => {
          if (user.dataValues.id !== senderVerify) {
            res.sendStatus(403);
          } else {
            Message.findOne({
              where: {id: msgId}
            }).then(async (message) => {
              //save to database
              message.read = read;
              await message.save();
              res.json({ msgId, senderId, recipientId, read });
            })
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
