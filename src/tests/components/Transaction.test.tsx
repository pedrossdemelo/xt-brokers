import { Transaction } from "components";
import { render, screen } from "tests";
import { transactions } from "tests/mocks";

const mockTransaction = transactions[0];

describe("Transactions", () => {
  beforeEach(() => {
    render(<Transaction data={mockTransaction} />);
  });

  it("should display the ticker", () => {
    expect(screen.getByText(mockTransaction.codAtivo)).toBeInTheDocument();
  });

  it("should display the transaction value", () => {
    expect(
      screen.getByText(new RegExp(`${mockTransaction.valor.toFixed(2)}`, "i")),
    ).toBeInTheDocument();
  });

  it("should display the transaction amount", () => {
    expect(
      screen.getByText(new RegExp(`${mockTransaction.qtdeAtivo}`, "i")),
    ).toBeInTheDocument();
  });

  it("should display the transaction date", () => {
    const date = new Date(mockTransaction.data);

    const dateString = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

    expect(
      screen.getByText(new RegExp(`${dateString}`, "i")),
    ).toBeInTheDocument();
  });
});
