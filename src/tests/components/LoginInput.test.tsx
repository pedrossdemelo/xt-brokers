import { LoginInput } from "components";
import { render, screen, userEvent } from "tests";

describe("LoginInput", () => {
  beforeEach(() => {
    render(<LoginInput />);
  });

  it("should render a form element", () => {
    expect(document.querySelector("form")).toBeInTheDocument();
  });

  it("should render a email input element", () => {
    expect(document.getElementById("email-input")).toBeInTheDocument();
  });

  it("should render a password input element", () => {
    expect(document.getElementById("password-input")).toBeInTheDocument();
  });

  it("should render a login button", () => {
    expect(
      screen.getByText(/login/i, { selector: "button" }),
    ).toBeInTheDocument();
  });

  it("should render a sign up button", () => {
    expect(
      screen.getByText(/sign up/i, { selector: "button" }),
    ).toBeInTheDocument();
  });

  it("should handle invalid email", async () => {
    const emailInput = document.getElementById(
      "email-input",
    ) as HTMLInputElement;
    const loginBtn = screen.getByText(/login/i, { selector: "button" });

    await userEvent.type(emailInput, "invalid-email");

    await userEvent.click(loginBtn);

    expect(screen.findByText(/invalid email/i));

    await userEvent.clear(emailInput);

    await userEvent.click(loginBtn);

    expect(screen.findByText(/email is required/i));
  });

  it("should handle invalid password", async () => {
    const passwordInput = document.getElementById(
      "password-input",
    ) as HTMLInputElement;
    const loginBtn = screen.getByText(/login/i, { selector: "button" });

    await userEvent.click(loginBtn);

    expect(screen.findByText(/password is required/i));

    await userEvent.type(passwordInput, "short");

    await userEvent.click(loginBtn);

    expect(screen.findByText(/password must be at least 8 characters/i));
  });
});
