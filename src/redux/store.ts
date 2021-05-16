import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

let initialState: any = {};

try {
  let storageItem = sessionStorage.getItem("auth");
  if (storageItem) {
    initialState.auth = JSON.parse(storageItem);
  }
} catch (e) {
  console.log(e);
}

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
