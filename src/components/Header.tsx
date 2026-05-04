import {
  CashIcon,
  CodeIcon,
  CollectionIcon,
  DesktopComputerIcon,
  EyeIcon,
  EyeOffIcon,
  LogoutIcon,
  MenuAlt2Icon,
  MoonIcon,
  SunIcon,
  UserIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import { Theme } from "context/ThemeContext";
import { Dropdown } from "flowbite-react";
import { useTheme, useUserData } from "hooks";
import { useNavigate } from "react-router-dom";

const THEME_CYCLE: Theme[] = ["system", "light", "dark"];

const THEME_LABELS: Record<Theme, string> = {
  system: "System",
  light: "Light",
  dark: "Dark",
};

function ThemeIcon({
  theme,
  resolvedTheme,
}: {
  theme: Theme;
  resolvedTheme: "light" | "dark";
}) {
  if (theme === "system") return <DesktopComputerIcon className="h-6" />;
  if (resolvedTheme === "dark") return <MoonIcon className="h-6" />;
  return <SunIcon className="h-6" />;
}

function useHeader() {
  const { user, loggedIn, funds, logout, hideMoney, setHideMoney } =
    useUserData();
  const navigate = useNavigate();
  const { theme, resolvedTheme, setTheme } = useTheme();

  function goToFunds() {
    navigate("/funds");
  }

  function goToDashboard() {
    navigate("/");
  }

  function goToTransactions() {
    navigate("/transactions");
  }

  function cycleTheme() {
    const idx = THEME_CYCLE.indexOf(theme);
    const next = THEME_CYCLE[(idx + 1) % THEME_CYCLE.length];
    setTheme(next);
  }

  return {
    loggedIn,
    goToFunds,
    goToDashboard,
    goToTransactions,
    funds,
    showFunds: !hideMoney,
    toggleFunds: () => setHideMoney(!hideMoney),
    user,
    logout,
    theme,
    resolvedTheme,
    cycleTheme,
  };
}

export default function Header() {
  const {
    goToFunds,
    goToDashboard,
    goToTransactions,
    logout,
    funds,
    showFunds,
    toggleFunds,
    loggedIn,
    user,
    theme,
    resolvedTheme,
    cycleTheme,
  } = useHeader();

  if (!loggedIn) return null;

  return (
    <nav className="relative h-14 md:px-6 md:h-16 flex px-4 py-2 z-50 justify-between items-center bg-slate-900 text-white">
      <Dropdown
        inline
        arrowIcon={false}
        id="mobile-menu"
        label={<MenuAlt2Icon className="h-6" />}
      >
        <Dropdown.Item>
          <div id="user-email" className="flex gap-2 items-center mr-2">
            <UserIcon className="h-6" />

            <span className="ml-2">{user?.email}</span>
          </div>
        </Dropdown.Item>

        <Dropdown.Divider />

        <Dropdown.Item onClick={goToDashboard}>
          <div id="dash-link" className="flex gap-2 items-center mr-2">
            <ViewGridIcon className="h-6" />

            <span className="ml-2">Dashboard</span>
          </div>
        </Dropdown.Item>

        <Dropdown.Item onClick={goToFunds}>
          <div id="funds-link" className="flex gap-2 items-center mr-2">
            <CashIcon className="h-6" />

            <span className="ml-2">Funds</span>
          </div>
        </Dropdown.Item>

        <Dropdown.Item onClick={goToTransactions}>
          <div id="transactions-link" className="flex gap-2 items-center mr-2">
            <CollectionIcon className="h-6" />

            <span className="ml-2">Transactions</span>
          </div>
        </Dropdown.Item>

        <Dropdown.Item>
          <a
            href="https://pedrosousa.dev"
            target="_blank"
            id="dev-link"
            className="flex gap-2 items-center -my-2 py-2 -mx-4 px-4 w-full"
            rel="noreferrer"
          >
            <CodeIcon className="h-6" />

            <span className="ml-2">Developer</span>
          </a>
        </Dropdown.Item>

        <Dropdown.Item onClick={cycleTheme}>
          <div id="theme-toggle" className="flex gap-2 items-center mr-2">
            <ThemeIcon theme={theme} resolvedTheme={resolvedTheme} />

            <span className="ml-2">Theme: {THEME_LABELS[theme]}</span>
          </div>
        </Dropdown.Item>

        <Dropdown.Divider />

        <Dropdown.Item onClick={logout}>
          <div
            id="logout-link"
            className="flex gap-2 items-center text-danger mr-2"
          >
            <LogoutIcon className="h-6" />

            <span className="ml-2">Logout</span>
          </div>
        </Dropdown.Item>
      </Dropdown>

      <div
        className={`text-center -mb-0.5 px-2 rounded ${
          !showFunds && "text-muted-strong bg-muted-strong select-none"
        }`}
        aria-hidden={!showFunds}
        id="funds"
      >
        <label htmlFor="funds" className="block text-xs -mb-[5px]">
          Funds:
        </label>

        <h1 className={"text-xl font-medium rounded-md"}>
          R$ {funds.toFixed(2)}
        </h1>
      </div>

      <button id="hide-money" onClick={toggleFunds}>
        {showFunds ? (
          <EyeIcon className="h-5" />
        ) : (
          <EyeOffIcon className="h-5" />
        )}
      </button>
    </nav>
  );
}
