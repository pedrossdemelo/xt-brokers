import usePapers from "hooks/usePapers";
import React from "react";
import Paper from "./Paper";

type Props = {};

export default function AllPapers({}: Props) {
  const { allPapers } = usePapers();

  return (
    <div className="max-h-80 overflow-y-scroll">
      <div>AllPapers</div>
      <div>
        {allPapers.map(paper => (
          <Paper
            key={paper.CodAtivo}
            data={paper}
          />
        ))}
      </div>
    </div>
  );
}
