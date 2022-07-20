import { cleanup, render } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach } from "vitest";
import { MockContext, UserProviderMock } from "./mocks";

afterEach(() => {
  cleanup();
});

const FakeContext = (mock?: MockContext, route?: string) =>
  function Context({ children }: { children: React.ReactNode }) {
    let paramValue, url;
    if (route) {
      [url, paramValue] = route.split("=");
      route = url;
      url = route.split(":")[0] + paramValue;
    }
    return (
      <UserProviderMock mockContext={mock}>
        <MemoryRouter initialEntries={[url ?? "/"]}>
          <Routes>
            <Route path={route ?? "/"} element={children} />
          </Routes>
        </MemoryRouter>
      </UserProviderMock>
    );
  };

const renderWithContext = (
  ui: React.ReactElement,
  options: Parameters<typeof render>[1] & {
    mock?: MockContext;
    route?: string;
  } = {},
) => {
  const [mock, route] = [options.mock, options.route];
  delete options.mock;
  delete options.route;
  return render(ui, { wrapper: FakeContext(mock, route), ...options });
};

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
export { renderWithContext as render };
