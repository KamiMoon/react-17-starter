import { ReactionButtons } from "./ReactionButtons";
import { render, screen } from "test-utils";
import { post1 } from "mocks/data/mock-posts";

test("renders", () => {
  render(<ReactionButtons post={post1} />, {
    initialState: {},
  });
  const linkElement = screen.getByText(/👍 0/i);
  expect(linkElement).toBeInTheDocument();
});
