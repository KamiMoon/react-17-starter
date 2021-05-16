// src/mocks/handlers.js
import { rest } from "msw";
import { posts } from "./data/mock-posts";
import { users } from "./data/mock-users";

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
    return res(ctx.status(200), ctx.json([users]));
  }),

  rest.post("/fakeApi/notifications", (req, res, ctx) => {
    console.log("fake api notifications called");
    return res(ctx.status(200), ctx.json([]));
  }),

  rest.get("/fakeApi/posts", (req, res, ctx) => {
    console.log("fake api login called");
    return res(ctx.status(200), ctx.json([posts]));
  }),

  rest.post("/fakeApi/posts", (req, res, ctx) => {
    console.log(req);
    console.log("fake api create post called");

    return res(ctx.status(200), ctx.json([posts]));
  }),
];
