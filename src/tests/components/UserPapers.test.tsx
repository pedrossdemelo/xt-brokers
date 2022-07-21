import { UserPapers } from "components";
import { render, screen, within } from "tests";
import { papers } from "tests/mocks";

const mockPapers = papers
  .slice(0, 5)
  .map((paper) => ({ ...paper, QteAtivo: 10 }));

const total = mockPapers.reduce(
  (acc, paper) => acc + paper.Valor * paper.QteAtivo,
  0,
);

describe("UserPapers", () => {
  describe("when the user has papers in his portfolio", () => {
    beforeEach(() => {
      render(<UserPapers />, { mock: { userPapers: mockPapers } });
    });

    it("should display all papers in the portfolio", async () => {
      for (const paper of mockPapers) {
        const paperElement = document.getElementById(
          `carousel-${paper.CodAtivo}`,
        )!;

        await within(paperElement).findByText(paper.CodAtivo);

        await within(paperElement).findByText(paper.NomeAtivo);

        await within(paperElement).findByText(
          new RegExp(`${paper.Valor}`, "i"),
        );

        await within(paperElement).findByText(
          new RegExp((paper.Valor * paper.QteAtivo).toFixed(2), "i"),
        );

        await within(paperElement).findByText(
          new RegExp(`${paper.Variacao}`, "i"),
        );

        await within(paperElement).findByText(
          new RegExp(`${paper.QteAtivo} shares`, "i"),
        );
      }
    });

    it("should display 'Portfolio' at the top", () => {
      expect(screen.getByText(/portfolio/i)).toBeInTheDocument();
    });

    it("should display the total portfolio value", () => {
      expect(
        screen.getByText(new RegExp(total.toFixed(2), "i")),
      ).toBeInTheDocument();
    });
  });

  describe("when the user has no papers in his portfolio", () => {
    beforeEach(() => {
      render(<UserPapers />, { mock: { userPapers: [] } });
    });

    it("should display 'start trading'", () => {
      expect(screen.getByText(/start trading/i)).toBeInTheDocument();
    });
  });
});
