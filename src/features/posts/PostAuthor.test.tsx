import { PostAuthor } from "./PostAuthor";
import { render, screen } from "../../test-utils";

const user = {
  id: "1",
  name: "Eric",
};

test("renders", () => {
  render(<PostAuthor userId={"1"} />, {
    initialState: {
      users: {
        ids: ["1"],
        entities: {
          "1": user,
        },
      },
    },
  });
  const linkElement = screen.getByText(/Eric/i);
  expect(linkElement).toBeInTheDocument();
});
