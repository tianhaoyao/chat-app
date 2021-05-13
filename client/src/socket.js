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
      setRead(
        data.msgId,
        data.senderId,
        data.recipientId,
        data.read,
        data.conversationId
      )
    );
  });
});

export default socket;
