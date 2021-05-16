import { EditPostForm } from "./EditPostForm";
import { render, screen } from "../../test-utils";
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
};

test("renders", () => {
  render(<EditPostForm match={match} />, {
    initialState: initialState,
  });
  const inputElement = screen.getByDisplayValue(/My Title/i);
  expect(inputElement).toBeInTheDocument();
});
