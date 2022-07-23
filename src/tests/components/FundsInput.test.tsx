import { FundsInput } from "components";
import { fireEvent, render, screen, userEvent } from "tests";

const getInput = () =>
  screen.getByLabelText(/specify the amount/i) as HTMLInputElement;

describe("FundsInput", () => {
  beforeEach(() => {
    render(<FundsInput />);
  });

  it("should render an input", () => {
    const amountInput = getInput();

    expect(amountInput).toBeInTheDocument();
  });

  it("should not accept inputs other than numbers", () => {
    const amountInput = getInput();

    fireEvent.change(amountInput, { target: { value: "Not a Number" } });

    expect(amountInput.value).toBe("");
  });

  it("should invert inputs less than 0", () => {
    const amountInput = getInput();

    fireEvent.change(amountInput, { target: { value: "-10" } });

    expect(amountInput.value).toBe("10");
  });

  it("should increase by X when the +X button is clicked", async () => {
    const amountInput = getInput();

    await userEvent.click(screen.getByText(/\+R\$ 50$/i));

    expect(amountInput.value).toBe("50");

    await userEvent.click(screen.getByText(/\+R\$ 100$/i));

    expect(amountInput.value).toBe("150");

    await userEvent.click(screen.getByText(/\+R\$ 500$/i));

    expect(amountInput.value).toBe("650");
  });

  it("should increase by the funds amount when the +Funds button is clicked", () => {
    const amountInput = getInput();

    fireEvent.click(screen.getByText(/\+Funds$/i));

    expect(amountInput.value).toBe("10000");
  });

  it("should switch the transaction type when clicking the switch icon", async () => {
    const switchBtn = screen.getByTestId(
      "switch-transaction",
    ) as HTMLButtonElement;

    await screen.findByText(/deposit request/i);

    await userEvent.click(switchBtn);

    await screen.findByText(/withdraw request/i);
  });

  it("should reset the input when the transaction button is clicked", async () => {
    const amountInput = getInput();

    await userEvent.click(screen.getByText(/\+R\$ 50$/i));

    expect(amountInput.value).toBe("50");

    await userEvent.click(screen.getByText(/\+Funds$/i));

    expect(amountInput.value).toBe("10050");

    await userEvent.click(screen.getByText("DEPOSIT"));

    expect(amountInput.value).toBe("0");
  });
});
