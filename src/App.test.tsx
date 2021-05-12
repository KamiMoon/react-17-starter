import { render, screen } from "./test-utils";
import App from "./App";

test("renders learn react link", () => {
  render(<App />, {
    initialState: {},
  });
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});
