import { KeyIcon, MailIcon } from "@heroicons/react/solid";
import { TextInput } from "flowbite-react";
import { useUserData } from "hooks";
import React from "react";
import { useNavigate } from "react-router-dom";

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

function useLoginInput() {
  const navigate = useNavigate();
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [errorEmail, setErrorEmail] = React.useState<string | null>(null);
  const [errorPassword, setErrorPassword] = React.useState<string | null>(null);

  const { setUser } = useUserData();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorEmail(null);
    setErrorPassword(null);
    let valid = true;
    if (!EMAIL_REGEX.test(email)) {
      setErrorEmail(email ? "Invalid email" : "Email is required");
      valid = false;
    }
    if (password.length < 8) {
      setErrorPassword("Password must be at least 8 characters");
      valid = false;
    }
    if (valid) {
      setUser(email);
      navigate("/");
    }
  }

  return {
    password,
    setPassword: (e: React.ChangeEvent<HTMLInputElement>) =>
      setPassword(e.target.value),
    email,
    setEmail: (e: React.ChangeEvent<HTMLInputElement>) =>
      setEmail(e.target.value),
    handleSubmit,
    errorEmail,
    errorPassword,
  };
}

export default function LoginInput() {
  const {
    password,
    setPassword,
    email,
    setEmail,
    errorEmail,
    errorPassword,
    handleSubmit,
  } = useLoginInput();

  return (
    <>
      <form
        className="flex flex-col gap-4 p-8 lg:gap-6 lg:p-12 shadow-lg max-w-md
          md:max-w-xl w-full rounded-lg bg-white"
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

            <p role="alert" className="text-red-500">
              {errorEmail}
            </p>
          </div>

          <TextInput
            id="email-input"
            type="text"
            onChange={setEmail}
            value={email}
            placeholder="user@xtinc.com.br"
            icon={MailIcon}
          />
        </div>

        <div>
          <div className="mb-2 flex justify-between text-sm">
            <label className="text-gray-500" htmlFor="password-input">
              Password
            </label>

            <p role="alert" className="text-red-500">
              {errorPassword}
            </p>
          </div>

          <TextInput
            onChange={setPassword}
            value={password}
            id="password-input"
            type="password"
            icon={KeyIcon}
          />
        </div>

        <div className="flex pt-4 gap-4">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
            focus:ring-blue-300 font-medium rounded-lg px-5 py-3.5 mr-2 mb-2
            focus:outline-none w-full"
          >
            Login
          </button>

          <button
            type="submit"
            className="text-white bg-emerald-500 hover:bg-emerald-700 focus:ring-4
            focus:ring-blue-300 font-medium rounded-lg px-5 py-3.5 ml-2 mb-2
            focus:outline-none w-full"
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
    </>
  );
}
