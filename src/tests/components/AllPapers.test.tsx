import { AllPapers } from "components";
import { render, screen } from "tests";
import { describe, expect, it } from "vitest";

describe("AllPapers component", () => {
  it.todo("implement tests");

  it("", () => {
    render(<AllPapers />);
    expect(screen.getByText(/stocks/i)).toBeInTheDocument();
  });
});
