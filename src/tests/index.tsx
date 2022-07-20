import {
  cleanup,
  render,
  renderHook,
  RenderHookOptions,
} from "@testing-library/react";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach } from "vitest";
import { MockContext, UserProviderMock } from "./mocks";

afterEach(() => {
  cleanup();
});

const FakeContext = (mock?: MockContext, route: string = "") =>
  function Context({ children }: { children: React.ReactNode }) {
    let url = "";
    const routeSplit = route.split("/");
    route = "";
    for (let path of routeSplit) {
      if (!path) continue;
      if (path.startsWith(":")) {
        let [param, paramValue] = path.split("=");
        url += `/${paramValue}`;
        route += `/${param}`;
      } else {
        url += `/${path}`;
        route += `/${path}`;
      }
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

/**
 * Render a component with a mock context and route.
 * @param ui - A renderable component to test.
 * @param options - Optional render options.
 * @see https://testing-library.com/docs/react-testing-library/api#render-options
 * @param options.mock - The mock context value
 * @param options.route - The route to use
 * @example ```jsx
 * render(<Component />, {
 *      route: "/route/:param=value/:param2=value2",
 *      mock: { user: "JohnDoe@gmail.com" }
 * });
 * ```
 * @returns The rendered component.
 */
function renderWithContext(
  ui: React.ReactElement,
  options: Parameters<typeof render>[1] & {
    mock?: MockContext;
    route?: string;
  } = {},
) {
  const [mock, route] = [options.mock, options.route];
  delete options.mock;
  delete options.route;
  return render(ui, { wrapper: FakeContext(mock, route), ...options });
}

function renderHookWithContext<Result, Props>(
  render: () => Result,
  options: RenderHookOptions<Props> & {
    mock?: MockContext;
    route?: string;
  } = {},
) {
  const [mock, route] = [options.mock, options.route];
  delete options.mock;
  delete options.route;
  return renderHook(render, {
    wrapper: FakeContext(mock, route),
    ...options,
  });
}

export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";
export { renderWithContext as render };
export { renderHookWithContext as renderHook };
