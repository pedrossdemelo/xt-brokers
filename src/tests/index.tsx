import { cleanup, render } from "@testing-library/react";
import { UserProvider } from "context";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});

function Context({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <BrowserRouter>{children}</BrowserRouter>
    </UserProvider>
  );
}

const renderWithContext = (ui: React.ReactElement, options = {}) =>
  render(ui, { wrapper: Context, ...options });

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
export { renderWithContext as render };
