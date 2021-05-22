import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { client } from "api/client";
import { Post } from "models/Post";
import type { RootState } from "redux/store";

const postsAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState({
  status: "idle",
  error: "",
});

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await client.get("/fakeApi/posts");
  return response.data;
});

export const fetchPost = createAsyncThunk(
  "posts/fetchPost",
  async (payload: { id: string }) => {
    const response = await client.get(`/fakeApi/posts/${payload.id}`);
    return response.data;
  }
);

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (post: { title: string; content: string; user: string }) => {
    const response = await client.post("/fakeApi/posts", post);
    return response.data;
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (post: Post) => {
    const response = await client.put(`/fakeApi/posts/${post.id}`, post);
    return response.data;
  }
);

export const fetchPostsByUserId = createAsyncThunk(
  "posts/fetchPostsByUser",
  async (payload: { id: string }) => {
    const response = await client.get(`/fakeApi/postsByUser/${payload.id}`);
    return response.data;
  }
);

export const removePost = createAsyncThunk(
  "posts/removePost",
  async (payload: { id: string }) => {
    const response = await client.delete(`/fakeApi/posts/${payload.id}`);
    return response.data.id;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // postUpdated(state, action) {
    //   const { id, title, content } = action.payload;
    //   const existingPost = state.entities[id];
    //   if (existingPost) {
    //     existingPost.title = title;
    //     existingPost.content = content;
    //   }
    // },
    // reactionAdded(state, action) {
    //   const { postId, reaction } = action.payload;
    //   const existingPost = state.entities[postId];
    //   if (existingPost && existingPost.reactions && reaction) {
    //     let foundReaction: any = existingPost.reactions;
    //     foundReaction[reaction]++;
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = "succeeded";
      postsAdapter.upsertMany(state, action.payload);
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = "failed";
      if (action.error.message) {
        state.error = action.error.message;
      }
    });

    builder.addCase(addNewPost.fulfilled, postsAdapter.addOne);
    builder.addCase(fetchPostsByUserId.fulfilled, postsAdapter.upsertMany);
    builder.addCase(fetchPost.fulfilled, postsAdapter.upsertOne);
    builder.addCase(removePost.fulfilled, postsAdapter.removeOne);
    //builder.addCase(updatePost.fulfilled, postsAdapter.updateOne);

    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.status = "succeeded";

      state.entities[action.payload.id] = action.payload;
    });
  },
});

//export const { reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;

// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors((state: RootState) => state.posts);

// export const selectAllPosts = (state: RootState) => state.posts.posts;

// export const selectPostById = (state: RootState, postId: string) =>
//   state.posts.posts.find((post: Post) => post.id === postId);

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state: RootState, userId: string) => userId],
  (posts, userId) => posts.filter((post) => post.user === userId)
);
