import { Header } from "components";
import { render, screen, userEvent, within } from "tests";

const getMenuBtn = () => screen.getByTestId("tooltip-target") as HTMLDivElement;
const getMenu = () => screen.getByRole("tooltip") as HTMLDivElement;

describe("Header", () => {
  beforeEach(() => {
    render(<Header />, { mock: { user: { email: "TEST_USER@EMAIL.COM" } } });

    class ROMock {
      constructor() {}
      observe() {}
      unobserve() {}
      disconnect() {}
    }

    window.ResizeObserver = ROMock;
  });

  it("renders the user's current funds", () => {
    const funds = document.getElementById("funds") as HTMLHeadingElement;

    expect(funds).toHaveTextContent("R$ 10000.00");
  });

  it("renders a button to toggle fund visibility", async () => {
    const toggleFunds = document.getElementById(
      "hide-money",
    ) as HTMLButtonElement;

    expect(toggleFunds).toBeInTheDocument();
  });

  it("toggles the fund visibility when the button is clicked", async () => {
    const funds = document.getElementById("funds") as HTMLHeadingElement;
    const toggleFunds = document.getElementById(
      "hide-money",
    ) as HTMLButtonElement;

    expect(funds).toHaveAttribute("aria-hidden", "false");

    await userEvent.click(toggleFunds);

    expect(funds).toHaveAttribute("aria-hidden", "true");
  });

  it("renders a dropdown mobile menu icon", async () => {
    const menuBtn = getMenuBtn();

    expect(menuBtn).toBeInTheDocument();
  });

  it("should hide the menu until clicked", async () => {
    const menu = getMenu();
    const menuBtn = getMenuBtn();

    expect(menu).toHaveClass("invisible");

    await userEvent.click(menuBtn);

    expect(menu).not.toHaveClass("invisible");
  });

  it("renders a dropdown menu with the user's name", async () => {
    const menu = getMenu();
    const menuBtn = getMenuBtn();

    await userEvent.click(menuBtn);

    await within(menu).findByText("TEST_USER@EMAIL.COM");
  });

  it("renders a dropdown menu with a logout button", async () => {
    const menu = getMenu();
    const menuBtn = getMenuBtn();

    await userEvent.click(menuBtn);

    await within(menu).findByText(/logout/i);
  });

  it("renders a dropdown menu with a link to the developer page", async () => {
    const menu = getMenu();
    const menuBtn = getMenuBtn();

    await userEvent.click(menuBtn);

    await within(menu).findByText(/developer/i);
  });

  it("renders a dropdown menu with a link to the funds page", async () => {
    const menu = getMenu();
    const menuBtn = getMenuBtn();

    await userEvent.click(menuBtn);

    await within(menu).findByText(/funds/i);
  });

  it("renders a dropdown menu with a link to the dashboard page", async () => {
    const menu = getMenu();
    const menuBtn = getMenuBtn();

    await userEvent.click(menuBtn);

    await within(menu).findByText(/dashboard/i);
  });
});
