import { Button } from "flowbite-react";
import useUserData from "hooks/useUserData";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

function useHeader() {
  const { user, loggedAt } = useUserData();
  const navigate = useNavigate();

  function goToFunds() {
    navigate("/funds");
  }

  return { user, loggedAt, goToFunds };
}

export default function Header({}: Props) {
  const { user, loggedAt, goToFunds } = useHeader();

  return (
    <>
      <div>Header</div>
      <div id="user">User: {user}</div>
      <div id="last-login">loggedAt: {loggedAt.toISOString()}</div>
      <Button onClick={goToFunds}>Funds</Button>
    </>
  );
}
