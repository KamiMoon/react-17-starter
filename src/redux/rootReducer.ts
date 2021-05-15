import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./slicers/counterSlice";
import postReducer from "./slicers/postsSlice";
import userReducer from "./slicers/usersSlice";
import notificationReducer from "./slicers/notificationSlice";
import authReducer from "./slicers/authSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  posts: postReducer,
  users: userReducer,
  notifications: notificationReducer,
  auth: authReducer,
});

export default rootReducer;
