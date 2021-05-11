import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";

import user from "./user";
import conversations from "./conversations";
import activeConversation from "./activeConversation";

const CALCULATE_UNREAD = "CALCULATE_UNREAD"
const CLEAR_ON_LOGOUT = "CLEAR_ON_LOGOUT";

export const clearOnLogout = () => {
  return {
    type: CLEAR_ON_LOGOUT
  };
};

const appReducer = combineReducers({
  user,
  conversations,
  activeConversation,
});
const rootReducer = (state, action) => {
  if (action.type === CLEAR_ON_LOGOUT) {
    // set state to initial state
    state = undefined;
  }
  else if(action.type === CALCULATE_UNREAD) {
    return updateUnreadCount(state, action.payload.msgId);
  }
  return appReducer(state, action);
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
      applyMiddleware(thunkMiddleware, loggerMiddleware)
    ));

export const updateUnreadCount = (state, msgId) => {
  let conversationKey = -1
  for(let j = 0; j < state.length; j++) {
    for(let i = 0; i < state[j].messages.length; i++){
      if(state[j].messages[i].id === msgId){
        conversationKey = j
        break;
        
      }
    }
  }
  let myId = state.user.id;

  return state.conversations.map((convo) => {
    if(convo.id === conversationKey) {
      let unread = 0
      for(let i = 0; i < convo.messages.length; i++) {
        if(convo.messages[i].read === false && convo.messages[i].senderId !== myId) {
          unread += 1
        }
      }
      let newConvo = { ...convo };
      newConvo.unread = unread;
      return newConvo
    } else {
      return convo;
    }
  });
};

export const calculateUnread = (msgId) => {
  return {
    type: CALCULATE_UNREAD,
    payload: { msgId },
  };
}


export default store
