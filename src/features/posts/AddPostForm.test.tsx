import { AddPostForm } from "./AddPostForm";
import { render, screen } from "../../test-utils";
import { user1 } from "../../mocks/data/mock-users";
import { post1 } from "../../mocks/data/mock-posts";

const match = {
  params: {
    postId: "1",
  },
};

const initialState = {
  posts: {
    ids: ["1"],
    entities: {
      "1": post1,
    },
  },
  users: {
    ids: ["1"],
    entities: {
      "1": user1,
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
