import { Paper } from "components";
import { render } from "tests";
import { papers } from "utils";
import { describe, it } from "vitest";

describe("Paper component", () => {
  it.todo("implement tests");
  it("should render", () => {
    render(<Paper data={papers[0]} />);
  });
});
