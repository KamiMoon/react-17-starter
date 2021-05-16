import { UserPage } from "./UserPage";
import { render, screen } from "test-utils";
import { user1 } from "mocks/data/mock-users";
import { post1 } from "mocks/data/mock-posts";

const match = {
  params: {
    userId: "1",
  },
};

const initialState = {
  posts: {
    ids: ["1"],
    entities: {
      "1": post1,
    },
  },
  users: {
    ids: ["1"],
    entities: {
      "1": user1,
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
