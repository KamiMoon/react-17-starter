import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./slicers/counterSlice";
import postReducer from "./slicers/postsSlice";
import userReducer from "./slicers/usersSlice";
import notificationReducer from "./slicers/notificationSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  posts: postReducer,
  users: userReducer,
  notifications: notificationReducer,
});

export default rootReducer;
