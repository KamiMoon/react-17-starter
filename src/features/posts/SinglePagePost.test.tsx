import { SinglePostPage } from "./SinglePagePost";
import { render, screen, fireEvent, waitFor } from "test-utils";
import { post1 } from "mocks/data/mock-posts";
import { createMemoryHistory } from "history";

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

test("clicks and updates reactions", async () => {
  render(<SinglePostPage match={{ params: { postId: "1" } }} />, {
    initialState: {
      posts: {
        entities: {
          "1": post1,
        },
      },
    },
  });

  const reactionButton = screen.getByText("👍 0");
  fireEvent.click(reactionButton);

  await waitFor(() => screen.getByText("👍 1"));

  expect(screen.getByText("👍 1")).toBeInTheDocument();
});

test("clicks edit button and navigates", async () => {
  const history = createMemoryHistory();
  history.push = jest.fn();

  render(<SinglePostPage match={{ params: { postId: "1" } }} />, {
    initialState: {
      posts: {
        entities: {
          "1": post1,
        },
      },
    },
    history,
  });

  const edit = screen.getByText("Edit Post");
  fireEvent.click(edit);

  expect(history.push).toHaveBeenCalledWith("/posts/edit/1");
});
