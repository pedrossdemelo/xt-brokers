import { AllPapers } from "components";
import { render, screen } from "tests";

describe("AllPapers component", () => {
  it.todo("implement tests");

  it("", () => {
    render(<AllPapers />);
    expect(screen.getByText(/stocks/i)).toBeInTheDocument();
  });
});
