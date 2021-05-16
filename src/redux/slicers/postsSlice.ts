import {
  createSlice,
  nanoid,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { client } from "../../api/client";
import type { RootState } from "../store";

interface Post {
  id: string;
  date: string;
  title: string;
  content: string;
  user: string;
  reactions: any;
}

interface PostState {
  posts: Post[];
  status: string;
  error?: any;
}

// const initialState: PostState = {
//   posts: [],
//   status: "idle",
//   error: null,
// };

const postsAdapter = createEntityAdapter({
  sortComparer: (a: any, b: any) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await client.get("/fakeApi/posts");
  console.log(response);
  return response.posts;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  // The payload creator receives the partial `{title, content, user}` object
  async (initialPost) => {
    // We send the initial data to the fake API server
    const response = await client.post("/fakeApi/posts", { post: initialPost });
    // The response includes the complete post object, including unique ID
    return response.post;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // postAdded: {
    //   reducer(state, action) {
    //     state.posts.push(action.payload);
    //   },
    //   prepare(title, content, userId) {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         date: new Date().toISOString(),
    //         title,
    //         content,
    //         user: userId,
    //         reactions: {
    //           thumbsUp: 0,
    //           hooray: 0,
    //           heart: 0,
    //           rocket: 0,
    //           eyes: 0,
    //         },
    //       },
    //     } as any;
    //   },
    // },
    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      //const existingPost = state.posts.find((post) => post.id === id);
      const existingPost = state.entities[id];
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      //const existingPost = state.posts.find((post) => post.id === postId);
      const existingPost = state.entities[postId];
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.status = "succeeded";
      // Add any fetched posts to the array
      //state.posts = state.posts.concat(action.payload);
      postsAdapter.upsertMany(state, action.payload);
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    // builder.addCase(addNewPost.fulfilled, (state, action) => {
    //   state.posts.push(action.payload);
    // });

    builder.addCase(addNewPost.fulfilled, postsAdapter.addOne);
  },
});

export const { postUpdated, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;

// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors((state: any) => state.posts);

// export const selectAllPosts = (state: RootState) => state.posts.posts;

// export const selectPostById = (state: RootState, postId: string) =>
//   state.posts.posts.find((post: Post) => post.id === postId);

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state: any, userId: any) => userId],
  (posts, userId) => posts.filter((post) => post.user === userId)
);
