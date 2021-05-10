import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slicers/counterSlice";
import postReducer from "./slicers/postsSlice";
import userReducer from "./slicers/usersSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postReducer,
    users: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
