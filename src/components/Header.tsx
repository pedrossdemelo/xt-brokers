import {
  CashIcon,
  CodeIcon,
  EyeIcon,
  EyeOffIcon,
  LogoutIcon,
  MenuAlt2Icon,
  UserIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import { Dropdown } from "flowbite-react";
import { useUserData } from "hooks";
import React from "react";
import { useNavigate } from "react-router-dom";

function useHeader() {
  const { user, funds, logout } = useUserData();
  const navigate = useNavigate();
  const [showFunds, setShowFunds] = React.useState(true);

  function goToFunds() {
    navigate("/funds");
  }

  function goToDashboard() {
    navigate("/");
  }

  return {
    user,
    goToFunds,
    goToDashboard,
    funds,
    showFunds,
    toggleFunds: () => setShowFunds(!showFunds),
    logout: () => {
      navigate("/login");
      logout();
    },
  };
}

export default function Header() {
  const {
    user,
    goToFunds,
    goToDashboard,
    logout,
    funds,
    showFunds,
    toggleFunds,
  } = useHeader();

  if (!user) return null;

  return (
    <nav className="relative h-14 flex px-4 py-2 z-50 justify-between items-center bg-slate-900 text-white">
      <Dropdown
        inline
        arrowIcon={false}
        label={<MenuAlt2Icon className="h-6" />}
      >
        <Dropdown.Item>
          <div className="flex gap-2 items-center mr-2">
            <UserIcon className="h-6" />

            <span className="ml-2">{user}</span>
          </div>
        </Dropdown.Item>

        <Dropdown.Divider />

        <Dropdown.Item onClick={goToDashboard}>
          <div className="flex gap-2 items-center mr-2">
            <ViewGridIcon className="h-6" />

            <span className="ml-2">Dashboard</span>
          </div>
        </Dropdown.Item>

        <Dropdown.Item>
          <a
            href="https://pedrosousa.dev"
            target="_blank"
            className="flex gap-2 items-center -my-2 py-2 -mx-4 px-4 w-full"
            rel="noreferrer"
          >
            <CodeIcon className="h-6" />

            <span className="ml-2">Developer</span>
          </a>
        </Dropdown.Item>

        <Dropdown.Item onClick={goToFunds}>
          <div className="flex gap-2 items-center mr-2">
            <CashIcon className="h-6" />

            <span className="ml-2">Funds</span>
          </div>
        </Dropdown.Item>

        <Dropdown.Divider />

        <Dropdown.Item onClick={logout}>
          <div className="flex gap-2 items-center text-red-700 mr-2">
            <LogoutIcon className="h-6" />

            <span className="ml-2">Logout</span>
          </div>
        </Dropdown.Item>
      </Dropdown>

      <div
        className={`text-center -mb-0.5 px-2 rounded ${
          !showFunds && "text-slate-800 bg-slate-800 select-none"
        }`}
      >
        <label htmlFor="funds" className="block text-xs -mb-[5px]">
          Funds:
        </label>

        <h1 className={"text-xl font-medium rounded-md"} id="funds">
          R$ {funds.toFixed(2)}
        </h1>
      </div>

      <button onClick={toggleFunds}>
        {showFunds ? (
          <EyeOffIcon className="h-5" />
        ) : (
          <EyeIcon className="h-5" />
        )}
      </button>
    </nav>
  );
}
