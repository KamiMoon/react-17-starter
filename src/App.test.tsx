import { render, screen } from "./test-utils";
import App from "./App";

test("renders learn react link", () => {
  render(<App />, {
    initialState: {},
  });
  const text = screen.getAllByText(/Posts/i);
  expect(text[0]).toBeInTheDocument();
});
