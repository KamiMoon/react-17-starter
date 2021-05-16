// src/mocks/handlers.js
import { rest } from "msw";
import { posts, addPost } from "mocks/data/mock-posts";
import { users } from "mocks/data/mock-users";
import { Post } from "models/Post";

export const handlers = [
  rest.post("/fakeApi/login", (req, res, ctx) => {
    console.log("fake api login called");

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

  rest.get("/fakeApi/users", (req, res, ctx) => {
    console.log("fake api users called");
    return res(ctx.status(200), ctx.json(users));
  }),

  rest.get("/fakeApi/user/:id", (req, res, ctx) => {
    console.log("fake api get user");

    const user = users.find((i) => i.id === req.params.id);

    return res(ctx.status(200), ctx.json(user));
  }),

  rest.post("/fakeApi/notifications", (req, res, ctx) => {
    console.log("fake api notifications called");
    return res(ctx.status(200), ctx.json([]));
  }),

  rest.get("/fakeApi/posts", (req, res, ctx) => {
    console.log("fake api login called");
    return res(ctx.status(200), ctx.json(posts));
  }),

  rest.get("/fakeApi/posts/:id", (req, res, ctx) => {
    const post = posts.find((i) => i.id === req.params.id);

    return res(ctx.status(200), ctx.json(post));
  }),

  rest.get("/fakeApi/postsByUser/:userId", (req, res, ctx) => {
    console.log("fake api login called");

    const foundPosts = posts.filter((i) => i.user === req.params.userId);

    return res(ctx.status(200), ctx.json(foundPosts));
  }),

  rest.post("/fakeApi/posts", (req, res, ctx) => {
    const post = req.body as Post;
    const addedPost = addPost(post);

    return res(ctx.status(200), ctx.json(addedPost));
  }),
];