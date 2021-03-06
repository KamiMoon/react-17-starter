import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "redux/rootReducer";

let initialState: any = {};

try {
  let storageItem = localStorage.getItem("auth");
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

export function createStore(initialState: any = {}) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });
  return store;
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
