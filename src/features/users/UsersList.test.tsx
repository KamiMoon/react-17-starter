import { UsersList } from "./UsersList";
import { render, screen } from "../../test-utils";

const user = {
  id: "1",
  name: "Eric",
};

const initialState = {
  users: {
    ids: ["1"],
    entities: {
      "1": user,
    },
  },
};

test("renders", () => {
  render(<UsersList />, {
    initialState: initialState,
  });
  const text = screen.getByText(/Eric/i);
  expect(text).toBeInTheDocument();
});
