import { PostExcerpt } from "./PostExcerpt";
import { render, screen } from "../../test-utils";
import { post1 } from "../../mocks/data/mock-posts";

test("renders", () => {
  render(<PostExcerpt postId={"1"} />, {
    initialState: {
      posts: {
        ids: ["1"],
        entities: {
          "1": post1,
        },
        status: "succeeded",
      },
    },
  });
  const linkElement = screen.getByText(/My Title/i);
  expect(linkElement).toBeInTheDocument();
});
