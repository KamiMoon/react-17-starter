import { SinglePostPage } from "./SinglePagePost";
import { render, screen } from "../../test-utils";

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
          "1": {
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
          },
        },
      },
    },
  });
  const linkElement = screen.getByText("My Title");
  expect(linkElement).toBeInTheDocument();
});
