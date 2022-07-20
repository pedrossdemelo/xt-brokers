import { NotFound } from "pages";
import { render, screen } from "tests";

describe("NotFound", () => {
  beforeEach(() => {
    render(<NotFound />);
  });

  it("should inform the user that the page doesn't exist", () => {
    expect(screen.getByText(/not exist/i)).toBeInTheDocument();
  });

  it("should display a button to return to the dashboard", () => {
    const button = screen.getByRole("button", { name: /dashboard/i });

    expect(button).toBeInTheDocument();
  });
});
