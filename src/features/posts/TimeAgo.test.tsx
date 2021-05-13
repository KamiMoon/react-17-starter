import React from "react";
import { render, screen } from "@testing-library/react";
import { TimeAgo } from "./TimeAgo";

test("renders", () => {
  render(<TimeAgo timestamp={"2021-05-05T07:08:33.754Z"} />);
  const linkElement = screen.getByText(/days ago/i);
  expect(linkElement).toBeInTheDocument();
});
