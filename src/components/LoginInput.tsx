import { KeyIcon, MailIcon } from "@heroicons/react/solid";
import { supabase } from "api";
import { TextInput } from "flowbite-react";
import { useUserData } from "hooks";
import React from "react";

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;

// simplified from https://stackoverflow.com/questions/5142103/regex-to-validate-password-strength
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/g;
// ^              Start anchor
// (?=.*[A-Z])    At least one uppercase letter
// (?=.*[0-9])    At least one digit
// (?=.*[a-z])    At least one lowercase letter
// .{8,}          At least 8 characters
// $              End anchor

function useLoginInput() {
  const { loggedAt, lastEmail } = useUserData();

  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState(lastEmail ?? "");
  const [errorEmail, setErrorEmail] = React.useState<string | null>(null);
  const [errorPassword, setErrorPassword] = React.useState<string | null>(null);
  const isLogin = React.useRef(true);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrorEmail(null);
    setErrorPassword(null);

    let errorFlag = false;

    if (!EMAIL_REGEX.test(email)) {
      setErrorEmail(email ? "Invalid email" : "Email is required");
      errorFlag = true;
    }

    if (!PASSWORD_REGEX.test(password)) {
      if (password.length < 8) {
        setErrorPassword(
          password
            ? "Password must be at least 8 characters"
            : "Password is required",
        );
      } else {
        setErrorPassword("Please use uppercase, lowercase and numbers");
      }
      errorFlag = true;
    }

    if (!errorFlag) {
      if (isLogin.current) {
        let { error } = await supabase.auth.signIn({
          email,
          password,
        });

        if (error) {
          setErrorEmail(error.message);
          return;
        }
      } else {
        let { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          setErrorEmail(error.message);
          return;
        }
      }
    }
  }

  async function gSignIn() {
    const { error } = await supabase.auth.signIn({ provider: "google" });

    if (error) setErrorEmail(error?.message);
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
    loggedAt,
    isLogin,
    gSignIn,
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
    loggedAt,
    isLogin,
    gSignIn,
  } = useLoginInput();

  const loggedDate = loggedAt ? new Date(loggedAt) : null;

  return (
    <>
      <form
        className="flex flex-col gap-4 p-8 lg:gap-6 lg:p-12 shadow-lg max-w-md
          md:max-w-xl w-full rounded-lg bg-white"
        onSubmit={handleSubmit}
      >
        <div>
          <h1 className="text-2xl">Welcome to XT Brokers.</h1>

          <p className="text-gray-500 text-sm">
            {loggedDate
              ? `Last login at ${loggedDate.toLocaleDateString()} ${loggedDate.toLocaleTimeString()}`
              : "Log in to continue"}
          </p>
        </div>

        <div>
          <div className="mb-2 flex justify-between items-end text-sm">
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
          <div className="mb-2 flex gap-2 justify-between items-end text-sm">
            <label className="text-gray-500" htmlFor="password-input">
              Password
            </label>

            <p role="alert" className="text-red-500 text-right">
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
            onClick={() => (isLogin.current = true)}
            id="login-button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
            focus:ring-blue-300 font-medium rounded-lg px-5 py-3.5 mr-2 mb-2
            focus:outline-none w-full font-poppins transition"
          >
            Login
          </button>

          <button
            type="submit"
            onClick={() => (isLogin.current = false)}
            id="signup-button"
            className="text-white bg-emerald-500 hover:bg-emerald-600 focus:ring-4
            focus:ring-blue-300 font-medium rounded-lg px-5 py-3.5 ml-2 mb-2
            focus:outline-none w-full font-poppins transition"
          >
            Sign up
          </button>
        </div>
      </form>

      <button
        type="button"
        id="login-with-google"
        onClick={gSignIn}
        className="text-white bg-[#4285F4] hover:bg-blue-600 focus:ring-4
        focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg
        text-sm px-5 py-2.5 text-center inline-flex items-center
        dark:focus:ring-[#4285F4]/55 mt-8 font-poppins shadow-md transition"
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
