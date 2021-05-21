// src/mocks/handlers.js
import { rest } from "msw";
import { posts, addPost, updatePost, removePost } from "mocks/data/mock-posts";
import { users } from "mocks/data/mock-users";
import { Post } from "models/Post";

export const handlers = [
  //login
  rest.post("/fakeApi/login", (req, res, ctx) => {

    const result = {
      token: "abcd",
      roles: [
        {
          name: "Admin",
          isActive: true,
        },
      ],
    };

    return res(ctx.status(200), ctx.json(result));
  }),

  //users

  rest.get("/fakeApi/users", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(users));
  }),

  rest.get("/fakeApi/user/:id", (req, res, ctx) => {

    const user = users.find((i) => i.id === req.params.id);
    if (user) {
      return res(ctx.status(200), ctx.json(user));
    }
    return res(ctx.status(404));
  }),

  //notifications
  rest.post("/fakeApi/notifications", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([]));
  }),

  //posts
  rest.get("/fakeApi/posts", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(posts));
  }),

  rest.get("/fakeApi/posts/:id", (req, res, ctx) => {
    const post = posts.find((i) => i.id === req.params.id);

    if (post) {
      return res(ctx.status(200), ctx.json(post));
    }
    return res(ctx.status(404));
  }),

  rest.get("/fakeApi/postsByUser/:userId", (req, res, ctx) => {

    const foundPosts = posts.filter((i) => i.user === req.params.userId);

    return res(ctx.status(200), ctx.json(foundPosts));
  }),

  rest.post("/fakeApi/posts", (req, res, ctx) => {
    const post = req.body as Post;
    const addedPost = addPost(post);

    return res(ctx.status(200), ctx.json(addedPost));
  }),

  rest.put("/fakeApi/posts/:id", (req, res, ctx) => {
    const post = req.body as Post;
    const id = req.params.id;
    const updatedPost = updatePost(id, post);

    if (updatedPost) {
      return res(ctx.status(200), ctx.json(updatedPost));
    }
    return res(ctx.status(404));
  }),

  rest.delete("/fakeApi/posts/:id", (req, res, ctx) => {
    const id = req.params.id;
    const removedPost = removePost(id);

    if (removedPost) {
      return res(ctx.status(200), ctx.json(removedPost));
    }
    return res(ctx.status(404));
  }),
];
