import { SinglePostPage } from "./SinglePagePost";
import { render, screen } from "test-utils";
import { post1 } from "mocks/data/mock-posts";

test("renders - no post", () => {
  render(<SinglePostPage match={{ params: { postId: "1" } }} />, {
    initialState: {},
  });
  const linkElement = screen.getByText("Post not found!");
  expect(linkElement).toBeInTheDocument();
});

test("renders - with post", () => {
  render(<SinglePostPage match={{ params: { postId: "1" } }} />, {
    initialState: {
      posts: {
        entities: {
          "1": post1,
        },
      },
    },
  });
  const linkElement = screen.getByText("My Title");
  expect(linkElement).toBeInTheDocument();
});
