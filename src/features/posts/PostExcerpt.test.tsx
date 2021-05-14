import { PostExcerpt } from "./PostExcerpt";
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
  render(<PostExcerpt postId={"1"} />, {
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
