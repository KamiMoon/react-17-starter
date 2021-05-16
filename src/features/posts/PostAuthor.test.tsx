import { PostAuthor } from "./PostAuthor";
import { render, screen } from "../../test-utils";
import { user1 } from "../../mocks/data/mock-users";

test("renders", () => {
  render(<PostAuthor userId={"1"} />, {
    initialState: {
      users: {
        ids: ["1"],
        entities: {
          "1": user1,
        },
      },
    },
  });
  const linkElement = screen.getByText(/Eric/i);
  expect(linkElement).toBeInTheDocument();
});
