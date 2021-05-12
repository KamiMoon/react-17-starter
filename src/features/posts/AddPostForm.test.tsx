import { AddPostForm } from "./AddPostForm";
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

const user = {
  id: "1",
  name: "Eric",
};

const match = {
  params: {
    postId: "1",
  },
};

const initialState = {
  posts: {
    ids: ["1"],
    entities: {
      "1": post,
    },
  },
  users: {
    ids: ["1"],
    entities: {
      "1": user,
    },
  },
};

test("renders", () => {
  render(<AddPostForm />, {
    initialState: initialState,
  });
  const text = screen.getByText(/Add a New Post/i);
  expect(text).toBeInTheDocument();
});
