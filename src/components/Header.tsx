import useUserData from "hooks/useUserData";
import React from "react";

type Props = {};

export default function Header({}: Props) {
  const { user, loggedAt } = useUserData();

  return (
    <>
      <div>Header</div>
      <div id="user">User: {user}</div>
      <div id="last-login">loggedAt: {loggedAt.toISOString()}</div>
    </>
  );
}
