import { NotificationsList } from "./NotificationList";
import { render, screen } from "../../test-utils";

const user = {
  id: "1",
  name: "Eric",
};

const notification = {
  id: "1",
  message: "Hi",
  date: new Date("01/01/2021").toISOString(),
  user: "1",
};

const initialState = {
  notifications: {
    ids: ["1"],
    entities: {
      "1": notification,
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
  render(<NotificationsList />, {
    initialState: initialState,
  });
  const text = screen.getByText(/Eric/i);
  expect(text).toBeInTheDocument();

  const text2 = screen.getByText(/Hi/i);
  expect(text2).toBeInTheDocument();
});
