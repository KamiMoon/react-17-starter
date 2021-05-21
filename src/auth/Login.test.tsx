import Login from "./Login";
import { render, screen, fireEvent, waitFor, waitForElementToBeRemoved } from "test-utils";
import { createMemoryHistory } from "history";

test("renders", () => {
  render(<Login />, {
    initialState: {},
  });
  const text = screen.getAllByText(/Login/i);
  expect(text[0]).toBeInTheDocument();
});

test("clicks Login and gets errors", async () => {
  render(<Login />, {
    initialState: {},
  });
  const submitButton = screen.getByRole('button', { name: /Login/i });
  fireEvent.click(submitButton);

  await waitFor(() => screen.getByText(/Please input your Username!/i));

  expect(screen.getByText(/Please input your Username!/i)).toBeInTheDocument();
});

test("fills out form and clicks submit", async () => {
  const history = createMemoryHistory();
  history.push = jest.fn();

  render(<Login />, {
    initialState: {},
    history
  });
  const inputUsername = screen.getByPlaceholderText("Username");
  fireEvent.change(inputUsername, { target: { value: 'something' } })

  const inputPassword = screen.getByPlaceholderText("Password");
  fireEvent.change(inputPassword, { target: { value: 'mypass' } })

  const submitButton = screen.getByRole('button', { name: /Login/i });
  fireEvent.click(submitButton);

  await waitFor(() => expect(history.push).toHaveBeenCalledWith("/users"));
});