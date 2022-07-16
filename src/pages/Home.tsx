import { Label, TextInput, Button } from "flowbite-react";
import { MailIcon, KeyIcon } from "@heroicons/react/solid";
import React from "react";
import { useNavigate } from "react-router-dom";

function useHome() {
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate("/dashboard");
  }

  return {
    name,
    setName: (e: React.ChangeEvent<HTMLInputElement>) =>
      setName(e.target.value),
    email,
    setEmail: (e: React.ChangeEvent<HTMLInputElement>) =>
      setEmail(e.target.value),
    handleSubmit,
  };
}

export default function Home() {
  const { name, setName, email, setEmail, handleSubmit } = useHome();

  return (
    <>
      <h1 className="text-3xl mb-4">XT Brokers</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email-input" value="Email" />
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
          <div className="mb-2 block">
            <Label htmlFor="password-input" value="Password" />
          </div>
          <TextInput
            onChange={setName}
            value={name}
            id="password-input"
            type="password"
            required={true}
            icon={KeyIcon}
          />
        </div>
        <Button type="submit">Login</Button>
      </form>
    </>
  );
}
