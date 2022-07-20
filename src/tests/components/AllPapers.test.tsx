import { AllPapers } from "components";
import { render, screen, within } from "tests";
import { papers } from "tests/mocks";

const mockPapers = papers.slice(0, 5);

describe("AllPapers", () => {
  beforeEach(() => {
    render(<AllPapers />, { mock: { allPapers: mockPapers } });
  });

  it("should display all papers in the pool", async () => {
    for (const paper of mockPapers) {
      const paperElement = document.getElementById(`trade-${paper.CodAtivo}`)!;

      await within(paperElement).findByText(paper.CodAtivo);
      await within(paperElement).findByText(paper.NomeAtivo);
      await within(paperElement).findByText(new RegExp(`${paper.Valor}`, "i"));
      await within(paperElement).findByText(
        new RegExp(`${paper.Variacao}`, "i"),
      );
      await within(paperElement).findByText(`${paper.QteAtivo} available`);
    }
  });

  it("should display 'stocks' at the top", () => {
    expect(screen.getByText(/stocks/i)).toBeInTheDocument();
  });
});
