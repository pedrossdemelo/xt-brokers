import React from "react";

type Props = {};

export default function Header({}: Props) {
  return (
    <>
      <div>Header</div>
      <div id="user">XP User</div>
      <div id="last-login">Logged at 19:01</div>
    </>
  );
}
