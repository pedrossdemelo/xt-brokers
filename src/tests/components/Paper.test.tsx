import { Paper } from "components";
import { render } from "tests";
import { papers } from "../mocks";

describe("Paper component", () => {
  it.todo("implement tests");
  it("should render", () => {
    render(<Paper data={papers[0]} />);
  });
});
