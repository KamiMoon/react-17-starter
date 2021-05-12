import { EditPostForm } from "./EditPostForm";
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
};

test("renders", () => {
  render(<EditPostForm match={match} />, {
    initialState: initialState,
  });
  const inputElement = screen.getByDisplayValue(/My Title/i);
  expect(inputElement).toBeInTheDocument();
});
