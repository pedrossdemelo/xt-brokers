import { Button } from "flowbite-react";
import usePapers from "hooks/usePapers";
import useUserData from "hooks/useUserData";
import produce from "immer";
import React from "react";
import { papers } from "utils/mockData";

type InferArray<T> = T extends (infer U)[] ? U : never;
type Paper = InferArray<typeof papers>;

type Props = {
  data: Paper;
  personal?: boolean;
};

function usePaper(paper: Paper) {
  const { setAllPapers } = usePapers();
  const { setUserPapers } = useUserData();

  function sellPaper(amount: number) {
    setUserPapers(
      produce((draft: Paper[]) => {
        const index = draft.findIndex(p => p.CodAtivo === paper.CodAtivo);
        if (index !== -1 && draft[index].QteAtivo >= amount) {
          draft[index].QteAtivo -= amount;
        } else {
          alert("error");
        }
      })
    );

    setAllPapers(
      produce((draft: Paper[]) => {
        const index = draft.findIndex(p => p.CodAtivo === paper.CodAtivo);
        if (index !== -1) {
          draft[index].QteAtivo += amount;
        } else {
          draft.push({ ...paper, QteAtivo: amount });
        }
      })
    );
  }

  function buyPaper(amount: number) {
    setUserPapers(
      produce(draft => {
        const index = draft.findIndex(p => p.CodAtivo === paper.CodAtivo);
        if (index !== -1) {
          draft[index].QteAtivo += amount;
        } else {
          draft.push({ ...paper, QteAtivo: amount });
        }
      })
    );

    setAllPapers(
      produce(draft => {
        const index = draft.findIndex(p => p.CodAtivo === paper.CodAtivo);
        if (index !== -1 && draft[index].QteAtivo >= amount) {
          draft[index].QteAtivo -= amount;
        } else {
          alert("error");
        }
      })
    );
  }

  return { sellPaper, buyPaper };
}

export default function Paper({ data, personal }: Props) {
  const { sellPaper, buyPaper } = usePaper(data);

  return (
    <div>
      <div>
        {data.CodAtivo} {data.Valor} {data.QteAtivo}{" "}
      </div>
      <Button onClick={() => buyPaper(1)}>Buy</Button>
      {personal && <Button onClick={() => sellPaper(1)}>Sell</Button>}
    </div>
  );
}
