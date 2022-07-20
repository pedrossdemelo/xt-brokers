import { Trade } from "pages";
import { render, screen } from "tests";

describe("Trade component", () => {
  it.todo("implement tests");
  it("should render", () => {
    render(<Trade />, { route: "/trade/:ticker=ABCB4" });

    expect(screen.getByText("ABCB4")).toBeInTheDocument();
  });
});
