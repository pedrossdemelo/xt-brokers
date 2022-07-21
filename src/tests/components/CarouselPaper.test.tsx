import { CarouselPaper } from "components";
import { render, screen } from "tests";
import { papers } from "../mocks";

const mockPaper = { ...papers[0], QteAtivo: 10 };

describe("CarouselPaper", () => {
  beforeEach(() => {
    render(<CarouselPaper data={mockPaper} />);
  });

  it("should display the ticker", () => {
    expect(screen.getByText(mockPaper.CodAtivo)).toBeInTheDocument();
  });

  it("should display the name", () => {
    expect(screen.getByText(mockPaper.NomeAtivo)).toBeInTheDocument();
  });

  it("should display the price", () => {
    expect(
      screen.getByText(new RegExp(`${mockPaper.Valor}`, "i")),
    ).toBeInTheDocument();
  });

  it("should display the amount in the portfolio", () => {
    expect(
      screen.getByText(new RegExp(`${mockPaper.QteAtivo}`, "i")),
    ).toBeInTheDocument();
  });

  it("should display the price * amount", () => {
    expect(
      screen.getByText(
        new RegExp((mockPaper.Valor * mockPaper.QteAtivo).toFixed(2), "i"),
      ),
    ).toBeInTheDocument();
  });

  it("should display the variation", () => {
    expect(
      screen.getByText(new RegExp(`${mockPaper.Variacao}`, "i")),
    ).toBeInTheDocument();
  });
});
