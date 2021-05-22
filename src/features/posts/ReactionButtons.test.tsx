import { ReactionButtons } from "./ReactionButtons";
import { render, screen, fireEvent, waitFor } from "test-utils";
import { post1 } from "mocks/data/mock-posts";

const state1 = {
  posts: {
    ids: ["1"],
    entities: {
      "1": post1,
    },
  },
};

test("renders", () => {
  render(<ReactionButtons post={post1} />, {
    initialState: state1,
  });
  const reactionButton = screen.getByText(/👍 0/i);
  expect(reactionButton).toBeInTheDocument();
});

//TODO: Does not work because isn't updated - relies on parent to update
// test("clicks button and updates reaction", async () => {
//   render(<ReactionButtons post={post1} />, {
//     initialState: state1,
//   });
//   const reactionButton = screen.getByText(/👍 0/i);
//   fireEvent.click(reactionButton);

//   await waitFor(() => screen.getByText("👍 1"));

//   expect(screen.getByText("👍 1")).toBeInTheDocument();
// });