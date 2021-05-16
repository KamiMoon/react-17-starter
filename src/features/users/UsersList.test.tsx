import { UsersList } from "./UsersList";
import { render, screen } from "../../test-utils";
import { user1 } from "../../mocks/data/mock-users";

const initialState = {
  users: {
    ids: ["1"],
    entities: {
      "1": user1,
    },
  },
};

test("renders", () => {
  render(<UsersList />, {
    initialState: initialState,
  });
  const text = screen.getAllByText(/Eric/i);
  expect(text[0]).toBeInTheDocument();
});
