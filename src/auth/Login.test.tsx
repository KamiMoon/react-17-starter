import Login from "./Login";
import { render, screen } from "../test-utils";

test("renders", () => {
  render(<Login />, {
    initialState: {},
  });
  const text = screen.getAllByText(/Login/i);
  expect(text[0]).toBeInTheDocument();
});
