import React from "react";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  // eslint-disable-next-line no-unused-vars
  setTheme: (theme: Theme) => void;
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(resolved: ResolvedTheme) {
  const root = document.documentElement;
  root.classList.add("theme-switching");

  if (resolved === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }

  window.requestAnimationFrame(() => {
    root.classList.remove("theme-switching");
  });
}

function resolveTheme(theme: Theme): ResolvedTheme {
  return theme === "system" ? getSystemTheme() : theme;
}

function getInitialTheme(): Theme {
  // URL param takes priority as a one-shot override
  const urlTheme = new URLSearchParams(window.location.search).get("theme");
  if (urlTheme === "dark" || urlTheme === "light") return urlTheme;

  const stored = localStorage.getItem("theme") as Theme | null;
  if (stored === "light" || stored === "dark" || stored === "system")
    return stored;

  return "system";
}

interface Props {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: Props) {
  const [theme, setThemeState] = React.useState<Theme>(getInitialTheme);

  const resolvedTheme = resolveTheme(theme);

  const setTheme = React.useCallback((next: Theme) => {
    setThemeState(next);
    localStorage.setItem("theme", next);
    applyTheme(resolveTheme(next));
  }, []);

  // Apply on mount
  React.useEffect(() => {
    applyTheme(resolvedTheme);
  }, []);

  // Listen for OS preference changes when in system mode
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    function handleChange() {
      if (theme === "system") {
        applyTheme(getSystemTheme());
      }
    }
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, [theme]);

  const value = React.useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export default ThemeContext;
