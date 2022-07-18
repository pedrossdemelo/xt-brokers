import { KeyIcon, MailIcon } from "@heroicons/react/solid";
import { TextInput } from "flowbite-react";
import { useUserData } from "hooks";
import React from "react";
import { useNavigate } from "react-router-dom";

function useHome() {
  const navigate = useNavigate();
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const { setUser } = useUserData();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUser(email);
    navigate("/");
  }

  return {
    password,
    setPassword: (e: React.ChangeEvent<HTMLInputElement>) =>
      setPassword(e.target.value),
    email,
    setEmail: (e: React.ChangeEvent<HTMLInputElement>) =>
      setEmail(e.target.value),
    handleSubmit,
  };
}

export default function Home() {
  const { password, setPassword, email, setEmail, handleSubmit } = useHome();

  return (
    <div className="flex grow">
      <div className="hidden md:block w-72 bg-slate-900 text-white py-8 px-12">
        <h1 className="text-4xl">XT Brokers</h1>

        <p className="w-full">Simulate trading</p>
      </div>

      <div className="flex flex-col grow items-center justify-center p-4 md:p-10">
        <form
          className="flex flex-col gap-4 p-8 lg:gap-6 lg:p-12 shadow-lg max-w-md md:max-w-lg w-full rounded-lg bg-white"
          onSubmit={handleSubmit}
        >
          <div>
            <h1 className="text-2xl">Welcome to XT Brokers.</h1>

            <p className="text-gray-500 text-sm">Log in to continue.</p>
          </div>

          <div>
            <div className="mb-2 flex justify-between text-sm">
              <label className="text-gray-500" htmlFor="email-input">
                Email
              </label>

              <p className="text-red-500">error</p>
            </div>

            <TextInput
              id="email-input"
              type="email"
              onChange={setEmail}
              value={email}
              placeholder="user@xpinc.com.br"
              required={true}
              icon={MailIcon}
            />
          </div>

          <div>
            <div className="mb-2 flex justify-between text-sm">
              <label className="text-gray-500" htmlFor="password-input">
                Password
              </label>

              <p className="text-red-500">error</p>
            </div>

            <TextInput
              onChange={setPassword}
              value={password}
              id="password-input"
              type="password"
              required={true}
              icon={KeyIcon}
            />
          </div>

          <div className="flex pt-4 gap-4">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
            focus:ring-blue-300 font-medium rounded-lg px-5 py-3.5 mr-2 mb-2
            dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none
            dark:focus:ring-blue-800 w-full"
            >
              Login
            </button>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
            focus:ring-blue-300 font-medium rounded-lg px-5 py-3.5 ml-2 mb-2
            dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none
            dark:focus:ring-blue-800 w-full"
            >
              Sign up
            </button>
          </div>
        </form>

        <button
          type="button"
          className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4
        focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg
        text-sm px-5 py-2.5 text-center inline-flex items-center
        dark:focus:ring-[#4285F4]/55 mt-8"
        >
          <svg
            className="mr-2 -ml-1 w-4 h-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            ></path>
          </svg>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
