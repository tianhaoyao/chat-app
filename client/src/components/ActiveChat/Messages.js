import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { connect } from "react-redux";

const useStyles = makeStyles({
  chatDisplay: {
    overflowY: "scroll",
    maxHeight: "70vh",
  },
});

const Messages = (props) => {
  const { messages, otherUser, userId, conversationId, theirReadIndex } = props;
  const classes = useStyles();

  return (
    <Box className={classes.chatDisplay}>
      {messages.map((message, i) => {
        const time = moment(message.createdAt).format("h:mm");
        return message.senderId === userId ? (
          <SenderBubble
            key={message.id}
            id={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
            read={message.read}
            conversationId={conversationId}
            display={theirReadIndex === i}
          />
        ) : (
          <OtherUserBubble
            key={message.id}
            id={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
            read={message.read}
            recipientId={userId}
            conversationId={conversationId}
          />
        );
      })}
    </Box>
  );
};

const mapStateToProps = (state, ownProps) => {
  let convo = state.conversations.find(
    (conversation) => conversation.id === ownProps.conversationId
  );
  let newState = {
    ...ownProps,
    messages: convo.messages || [],
    theirReadIndex: convo.theirReadIndex
  };
  return newState;
};

export default connect(mapStateToProps, null)(Messages);
