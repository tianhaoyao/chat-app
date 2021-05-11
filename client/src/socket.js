import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  setRead,
} from "./store/conversations";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", (data) => {
    store.dispatch(
      setNewMessage(data.message, data.sender, data.recipientId, false)
    );
  });
  socket.on("set-reading", (data) => {
    store.dispatch(
      setRead(data.msgId, data.senderId, data.recipientId, data.read)
    );
    // calculateUnread is not working, but I will leave it here just for reference
    // the function is supposed to save the number of unread messages with the
    // for each conversation as a redux state, but to calculate that I need
    // the user's account id to avoid counting the user's unread messages.
    // to access the user's account id (without having to pass around parameters)
    // we need access to the other store, which requires thsi runction to be at
    // the root reducer, which is messing up as I think the middleware does not like that
    // import { calculateUnread } from "./store/index";
    // store.dispatch(calculateUnread(data.msgId));
  });
});

export default socket;
