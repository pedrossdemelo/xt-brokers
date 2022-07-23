import { Paper } from "components";
import { render, screen } from "tests";
import { papers } from "../mocks";

const mockPaper = { ...papers[0], qtdeAtivo: 10 };

describe("Paper", () => {
  beforeEach(() => {
    render(<Paper data={mockPaper} />);
  });

  it("should display the ticker", () => {
    expect(screen.getByText(mockPaper.codAtivo)).toBeInTheDocument();
  });

  it("should display the name", () => {
    expect(screen.getByText(mockPaper.nomeAtivo)).toBeInTheDocument();
  });

  it("should display the price", () => {
    expect(
      screen.getByText(new RegExp(`${mockPaper.valor}`, "i")),
    ).toBeInTheDocument();
  });

  it("should display the amount available", () => {
    expect(
      screen.getByText(new RegExp(`${mockPaper.qtdeAtivo}`, "i")),
    ).toBeInTheDocument();
  });

  it("should display the variation", () => {
    expect(
      screen.getByText(new RegExp(`${mockPaper.variacao}`, "i")),
    ).toBeInTheDocument();
  });
});
