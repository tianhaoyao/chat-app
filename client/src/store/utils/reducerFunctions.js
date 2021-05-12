export const addMessageToStore = (state, payload) => {
  const { message, sender, exists } = payload;
  // if not exists, then make a new convo
  if (exists === 0) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
      unread: 0,
    };
    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }

  let conversationKey = -1;
  let otherUserId = -1;

  let newState = [...state];
  for (let j = 0; j < newState.length; j++) {
    if (newState[j].id === message.conversationId) {
      conversationKey = j;
      otherUserId = newState[j].otherUser.id;
      break;
    }
  }

  let newConvo = Object.assign({}, newState[conversationKey]);
  let newMessages = [...newConvo.messages];
  newMessages.push(message);
  newConvo.messages = newMessages;
  newConvo.latestMessageText = message.text;

  let myUnreadCount = 0;
  let theirReadIndex = 0;

  for (let i = 0; i < newMessages.length; i++) {
    if (newMessages[i].senderId === otherUserId && !newMessages[i].read) {
      myUnreadCount++;
    } else if (newMessages[i].senderId !== otherUserId && newMessages[i].read) {
      theirReadIndex = i;
    }
  }

  newConvo.myUnreadCount = myUnreadCount;
  newConvo.theirReadIndex = theirReadIndex;

  newState[conversationKey] = newConvo;
  return newState;
};

export const setReadToStore = (state, payload) => {
  const { msgId, read, conversationId } = payload;
  let otherUserId = -1;
  let conversationKey = -1;
  let msgKey = -1;
  
  let newState = [...state];
  for (let j = 0; j < newState.length; j++) {
    if(newState[j].id === conversationId) {
      conversationKey = j;
      break;
    }
  }

  for (let i = 0; i < newState[conversationKey].messages.length; i++) {
    if (newState[conversationKey].messages[i].id === msgId) {
      msgKey = i;
      otherUserId = state[conversationKey].otherUser.id;
      break;
    }
  }

  let newConvo = Object.assign({}, newState[conversationKey]);
  let newMessages = [...newConvo.messages];
  let newMessage = Object.assign({}, newConvo.messages[msgKey]);
  newMessage.read = read;
  newMessages[msgKey] = newMessage;
  newConvo.messages = newMessages;

  let myUnreadCount = 0;
  let theirReadIndex = 0;

  for (let i = 0; i < newMessages.length; i++) {
    if (newMessages[i].senderId === otherUserId && !newMessages[i].read) {
      myUnreadCount++;
    } else if (newMessages[i].senderId !== otherUserId && newMessages[i].read) {
      theirReadIndex = i;
    }
  }

  newConvo.myUnreadCount = myUnreadCount;
  newConvo.theirReadIndex = theirReadIndex;
  newState[conversationKey] = newConvo;

  return newState;
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const newConvo = { ...convo };
      newConvo.unread = 0;
      newConvo.id = message.conversationId;
      newConvo.messages.push(message);
      newConvo.latestMessageText = message.text;
      return newConvo;
    } else {
      return convo;
    }
  });
};
