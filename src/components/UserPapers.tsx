import { useUserData } from "hooks";
import React from "react";
import Paper from "./Paper";

type Props = {};

export default function UserPapers({}: Props) {
  const { userPapers } = useUserData();

  return (
    <>
      <div>UserPapers</div>
      <div>
        {userPapers.map(paper => (
          <Paper
            key={paper.CodAtivo}
            data={paper}
            personal
          />
        ))}
      </div>
    </>
  );
}
