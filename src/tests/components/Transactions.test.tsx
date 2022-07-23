import { Transactions } from "pages";
import { render, screen, within } from "tests";
import { transactions } from "tests/mocks";

describe("Transactions", () => {
  beforeEach(() => {
    render(<Transactions />);
  });

  it("should display all user transactions", async () => {
    for (const transaction of transactions) {
      const date = new Date(transaction.data);

      const dateString = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

      const factor = transaction.venda ? 1 : -1;

      const transactionElement = document.getElementById(
        `transaction-${transaction.id}`,
      )!;

      await within(transactionElement).findByText(transaction.codAtivo, {
        exact: false,
      });
      await within(transactionElement).findByText(dateString);
      await within(transactionElement).findByText(
        new RegExp(`${(transaction.valor * factor).toFixed(2)}`, "i"),
      );
      await within(transactionElement).findByText(
        new RegExp(`${transaction.qtdeAtivo}`, "i"),
      );
    }
  });

  it("should display 'transactions' at the top", () => {
    expect(screen.getByText(/transactions/i)).toBeInTheDocument();
  });
});
