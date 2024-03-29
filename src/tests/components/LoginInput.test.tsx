import { LoginInput } from "components";
import { render, screen, userEvent } from "tests";

describe("LoginInput", () => {
  describe("when there's no last login stored", () => {
    beforeEach(() => {
      render(<LoginInput />);
    });

    it("should render a form element", () => {
      expect(document.querySelector("form")).toBeInTheDocument();
    });

    it("should display a 'login in to continue' message", async () => {
      expect(screen.getByText(/log in to continue/i)).toBeInTheDocument();
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

      await screen.findByText(/invalid email/i);

      await userEvent.clear(emailInput);

      await userEvent.click(loginBtn);

      await screen.findByText(/email is required/i);
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

      await screen.findByText(/password must be at least 8 characters/i);
    });

    it("should handle weak password", async () => {
      const passwordInput = document.getElementById(
        "password-input",
      ) as HTMLInputElement;
      const loginBtn = screen.getByText(/login/i, { selector: "button" });

      await userEvent.type(passwordInput, "weakbutlong");

      await userEvent.click(loginBtn);

      await screen.findByText(/uppercase/i);

      await screen.findByText(/number/i);

      await userEvent.clear(passwordInput);

      await userEvent.type(passwordInput, "weakButLong");

      await userEvent.click(loginBtn);

      await screen.findByText(/number/i);

      await userEvent.clear(passwordInput);

      await userEvent.type(passwordInput, "strongAndLong123");

      await userEvent.click(loginBtn);

      expect(screen.queryByText(/uppercase/i)).not.toBeInTheDocument();

      expect(screen.queryByText(/lowercase/i)).not.toBeInTheDocument();

      expect(screen.queryByText(/number/i)).not.toBeInTheDocument();
    });
  });

  describe("when the there's a last login stored", () => {
    const loggedAt = new Date();
    const loggedAtString = loggedAt.toISOString();
    const lastUser = "LoggedUser@xtinc.com";
    beforeEach(() => {
      render(<LoginInput />, {
        mock: {
          loggedAt: loggedAtString,
          lastEmail: lastUser,
        },
      });
    });

    it("should render a last login message", () => {
      expect(
        screen.getByText(
          new RegExp(
            `Last login at ${loggedAt.toLocaleDateString()} ${loggedAt.toLocaleTimeString()}`,
            "i",
          ),
        ),
      ).toBeInTheDocument();
    });

    it("should have the email pre-filled", () => {
      expect(document.getElementById("email-input")).toHaveValue(lastUser);
    });
  });
});
