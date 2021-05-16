import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "redux/slicers/counterSlice";
import postReducer from "redux/slicers/postsSlice";
import userReducer from "redux/slicers/usersSlice";
import notificationReducer from "redux/slicers/notificationSlice";
import authReducer from "redux/slicers/authSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  posts: postReducer,
  users: userReducer,
  notifications: notificationReducer,
  auth: authReducer,
});

export default rootReducer;
