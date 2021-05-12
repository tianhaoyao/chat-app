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
    const { msgId, senderId, recipientId, read, conversationId } = req.body;

    Message.findOne({
      where: { id: msgId },
    }).then(async (message) => {
      //save to database
      message.update({
        read: read
      })
      .then(res.json({ msgId, senderId, recipientId, read, conversationId }));
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
