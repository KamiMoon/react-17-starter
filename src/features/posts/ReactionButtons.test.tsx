import { ReactionButtons } from "./ReactionButtons";
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

test("renders", () => {
  render(<ReactionButtons post={post} />, {
    initialState: {},
  });
  const linkElement = screen.getByText(/👍 0/i);
  expect(linkElement).toBeInTheDocument();
});
