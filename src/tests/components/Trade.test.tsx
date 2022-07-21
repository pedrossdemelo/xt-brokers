import { Trade } from "pages";
import { fireEvent, render, screen, userEvent } from "tests";
import { papers } from "tests/mocks";

const FUNDS = 10000;

function getPaperMock(ticker: string) {
  return papers.find((paper) => paper.CodAtivo === ticker);
}

const Paper = getPaperMock("PETR4")!;

const {
  CodAtivo: ticker,
  Valor: price,
  QteAtivo: amount,
  NomeAtivo: name,
  Variacao: variation,
} = Paper;

function runSpecsOn(type: "BUY" | "SELL") {
  const isBuy = type === "BUY";
  const other = isBuy ? "SELL" : "BUY";

  const [typeLower, typeUpper] = [type.toLowerCase(), type.toUpperCase()];
  const [otherLower, otherUpper] = [other.toLowerCase(), other.toUpperCase()];

  async function switchToTab() {
    const typeTab = document.getElementById(
      `${typeLower}-tab`,
    ) as HTMLButtonElement;

    expect(typeTab).toBeInTheDocument();

    await userEvent.click(typeTab);
  }

  beforeEach(() => {
    render(<Trade />, {
      route: `/trade/:ticker=${ticker}`,
      mock: isBuy
        ? { funds: FUNDS }
        : {
            userPapers: [Paper],
            allPapers: papers.filter((p) => p.CodAtivo !== ticker),
            funds: FUNDS,
          },
    });
  });

  it("should render the /:ticker specified in the route", async () => {
    await screen.findByText(ticker);

    await screen.findByText(name);

    await expect(screen.queryByText(/not exist/i)).not.toBeInTheDocument();
  });

  it("should have a button to close and go back", async () => {
    const closeBtn = screen.getByLabelText(/close/i);

    expect(closeBtn).toBeInTheDocument();

    expect(closeBtn.tagName).toBe("BUTTON");
  });

  it(`should have an enabled '${typeUpper}' tab switch button`, async () => {
    await switchToTab();

    expect(document.getElementById(`${typeLower}-btn`)).toBeInTheDocument();

    expect(
      document.getElementById(`${otherLower}-btn`),
    ).not.toBeInTheDocument();
  });

  it(`should have a disabled '${otherUpper}' tab switch button initially with 0 papers in the ${
    isBuy ? "portfolio" : "pool"
  }`, async () => {
    const otherTab = document.getElementById(
      `${otherLower}-tab`,
    ) as HTMLButtonElement;

    expect(otherTab).toBeInTheDocument();

    expect(otherTab).toBeDisabled();
  });

  it("should have an amount number input", async () => {
    const amountInput = screen.getByLabelText(/amount/i) as HTMLInputElement;

    expect(amountInput).toBeInTheDocument();

    expect(amountInput.value).toBe("0");

    fireEvent.change(amountInput, { target: { value: "10" } });

    expect(amountInput.value).toBe("10");

    fireEvent.change(amountInput, { target: { value: "Not a Number" } });

    expect(amountInput.value).toBe("");
  });

  it("should inverse inputs less than 0", async () => {
    const amountInput = screen.getByLabelText(/amount/i) as HTMLInputElement;

    fireEvent.change(amountInput, { target: { value: "-10" } });

    expect(amountInput.value).toBe("10");
  });

  it("should inform the paper's price", async () => {
    await screen.findByText(new RegExp(price.toString(), "i"));
  });

  it("should inform the paper's variation", async () => {
    await screen.findByText(new RegExp(variation.toString(), "i"));
  });

  it("should inform the current funds", async () => {
    await screen.findByText(/funds/i);

    await screen.findByText(new RegExp(FUNDS.toString(), "i"));
  });

  it("should inform the user's position in the portfolio", async () => {
    await screen.findByText(/position/i);

    await screen.findByText(/^0 shares/i);
  });

  it("should inform the amount of papers available in the pool", async () => {
    await screen.findByText(/available/i);

    await screen.findByText(
      new RegExp(isBuy ? "100 shares" : "^0 shares", "i"),
    );
  });

  it("should have a dynamic order value display", async () => {
    await screen.findByText(/order/i);

    expect(screen.queryByText(/R\$ 0/i)).toBeInTheDocument();

    const amountInput = screen.getByLabelText(/amount/i) as HTMLInputElement;

    fireEvent.change(amountInput, { target: { value: "10" } });

    await screen.findByText(new RegExp((price * 10).toFixed(2), "i"));
  });

  it(`should show a '${typeUpper} {ticker}' button after clicking the ${typeLower} tab`, async () => {
    await switchToTab();

    const typeBtn = document.getElementById(
      `${typeLower}-btn`,
    ) as HTMLButtonElement;

    expect(typeBtn).toBeInTheDocument();

    expect(typeBtn.tagName).toBe("BUTTON");
  });

  it(`should have the '${typeUpper} {ticker}' button disabled when the amount is either 0 or greater than the available in the ${
    isBuy ? "pool" : "portfolio"
  }`, async () => {
    await switchToTab();

    const typeBtn = document.getElementById(
      `${typeLower}-btn`,
    ) as HTMLButtonElement;

    expect(typeBtn).toBeInTheDocument();

    expect(typeBtn).toBeDisabled();

    const amountInput = screen.getByLabelText(/amount/i) as HTMLInputElement;

    fireEvent.change(amountInput, { target: { value: "0" } });

    expect(typeBtn).toBeDisabled();

    fireEvent.change(amountInput, {
      target: { value: (amount + 1).toString() },
    });

    expect(typeBtn).toBeDisabled();

    fireEvent.change(amountInput, { target: { value: "1" } });

    expect(typeBtn).not.toBeDisabled();
  });

  it("should have functional increment and decrement buttons", async () => {
    await switchToTab();

    const amountInput = screen.getByLabelText(/amount/i) as HTMLInputElement;

    const incrementBtn = screen.getByLabelText(
      /increment/i,
    ) as HTMLButtonElement;

    fireEvent.change(amountInput, { target: { value: "10" } });

    expect(incrementBtn).toBeInTheDocument();

    expect(incrementBtn.tagName).toBe("BUTTON");

    fireEvent.click(incrementBtn);

    expect(amountInput.value).toBe("11");

    const decrementBtn = screen.getByLabelText(
      /decrement/i,
    ) as HTMLButtonElement;

    expect(decrementBtn).toBeInTheDocument();

    expect(decrementBtn.tagName).toBe("BUTTON");

    fireEvent.click(decrementBtn);

    expect(amountInput.value).toBe("10");
  });

  it("should have disabled increment/decrement buttons when the next value is invalid", async () => {
    await switchToTab();

    const amountInput = screen.getByLabelText(/amount/i) as HTMLInputElement;
    const incrementBtn = screen.getByLabelText(
      /increment/i,
    ) as HTMLButtonElement;
    const decrementBtn = screen.getByLabelText(
      /decrement/i,
    ) as HTMLButtonElement;

    expect(incrementBtn).toBeInTheDocument();
    expect(decrementBtn).toBeInTheDocument();

    expect(incrementBtn.tagName).toBe("BUTTON");
    expect(decrementBtn.tagName).toBe("BUTTON");

    expect(decrementBtn).toBeDisabled();
    expect(incrementBtn).not.toBeDisabled();

    fireEvent.click(incrementBtn);

    expect(amountInput.value).toBe("1");

    expect(decrementBtn).not.toBeDisabled();

    fireEvent.click(decrementBtn);

    expect(amountInput.value).toBe("0");

    fireEvent.change(amountInput, { target: { value: "100" } });

    expect(incrementBtn).toBeDisabled();
  });

  it(`should ${
    isBuy ? "decrease" : "increase"
  } the user's funds when clicking the ${typeUpper} button`, async () => {
    await switchToTab();

    const typeBtn = document.getElementById(
      `${typeLower}-btn`,
    ) as HTMLButtonElement;

    expect(typeBtn).toBeInTheDocument();

    expect(typeBtn).toBeDisabled();

    const amountInput = screen.getByLabelText(/amount/i) as HTMLInputElement;

    fireEvent.change(amountInput, { target: { value: "10" } });

    expect(typeBtn).not.toBeDisabled();

    fireEvent.click(typeBtn);

    render(<Trade />, { route: `/trade/:ticker=${ticker}` });

    const order = price * 10 * (isBuy ? -1 : 1);

    await screen.findByText(new RegExp((FUNDS + order).toFixed(2), "i"));
  });
}

describe("Trade", () => {
  describe("when the ticker does not exist", () => {
    beforeEach(() => {
      render(<Trade />, { route: "/trade/:ticker=INVALID" });
    });

    it("should inform the user the ticker does not exist", async () => {
      await screen.findByText(/not exist/i);
    });

    it("should have a button suggesting the user to return to dashboard", async () => {
      await screen.findByRole("button", {
        name: /return to dashboard/i,
      });
    });
  });

  describe("when the ticker exists only in the pool", () => {
    runSpecsOn("BUY");
  });

  describe("when the ticker exists only in the user's portfolio", () => {
    runSpecsOn("SELL");
  });
});
