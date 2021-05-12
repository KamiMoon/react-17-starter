import { UserPage } from "./UserPage";
import { render, screen } from "../../test-utils";

const post = {
  id: "1",
  date: new Date().toISOString(),
  title: "My Title",
  content: "My content",
  user: "1",
  reactions: {
    thumbsUp: 0,
    hooray: 0,
    heart: 0,
    rocket: 0,
    eyes: 0,
  },
};

const user = {
  id: "1",
  name: "Eric",
};

const match = {
  params: {
    userId: "1",
  },
};

const initialState = {
  posts: {
    ids: ["1"],
    entities: {
      "1": post,
    },
  },
  users: {
    ids: ["1"],
    entities: {
      "1": user,
    },
  },
};

test("renders", () => {
  render(<UserPage match={match} />, {
    initialState: initialState,
  });
  const text = screen.getByText(/Eric/i);
  expect(text).toBeInTheDocument();

  const text2 = screen.getByText(/My Title/i);
  expect(text2).toBeInTheDocument();
});
