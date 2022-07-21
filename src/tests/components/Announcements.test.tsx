import { Announcements } from "components";
import { render, screen } from "tests";

describe("Announcements", () => {
  beforeEach(() => {
    render(<Announcements />);
  });

  it("should display an ordered list of announcements", () => {
    expect(document.querySelector("ol")).toBeInTheDocument();
  });

  it("should display 'announcements' in the title", () => {
    expect(screen.getByText(/announcements/i)).toBeInTheDocument();
  });
});
