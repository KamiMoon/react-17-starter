import { PostsList } from "./PostsList";
import { render, screen } from "../../test-utils";

const post = {
  id: "1",
  date: new Date().toISOString(),
  title: "My Title",
  content: "My content",
  user: 1,
  reactions: {
    thumbsUp: 0,
    hooray: 0,
    heart: 0,
    rocket: 0,
    eyes: 0,
  },
};

test("renders with no posts", () => {
  render(<PostsList />, {
    initialState: {},
  });
  const linkElement = screen.getByText(/Posts/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders - loading", () => {
  render(<PostsList />, {
    initialState: {
      posts: {
        ids: [],
        entities: {},
        status: "idle",
      },
    },
  });
  const linkElement = screen.getByText(/Loading/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders - succeeded", () => {
  render(<PostsList />, {
    initialState: {
      posts: {
        ids: ["1"],
        entities: {
          "1": post,
        },
        status: "succeeded",
      },
    },
  });
  const linkElement = screen.getByText(/My Title/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders - failed", () => {
  render(<PostsList />, {
    initialState: {
      posts: {
        ids: [],
        entities: {},
        status: "failed",
        error: "Some Error",
      },
    },
  });
  const linkElement = screen.getByText(/Some Error/i);
  expect(linkElement).toBeInTheDocument();
});
