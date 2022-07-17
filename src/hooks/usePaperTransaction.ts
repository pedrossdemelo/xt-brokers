import produce from "immer";
import React from "react";
import { Paper } from "utils/mockData";
import useUserData from "./useUserData";

export default function usePaperTransaction(paper: Paper) {
  const { setUserPapers, setAllPapers, funds, setFunds } = useUserData();

  const sellPaper = React.useCallback(
    (amount: number) => {
      let error = false;

      setUserPapers(
        produce(draft => {
          const index = draft.findIndex(p => p.CodAtivo === paper.CodAtivo);

          if (index !== -1 && draft[index].QteAtivo >= amount) {
            draft[index].QteAtivo -= amount;
          } else {
            error = true;
            return;
          }

          if (draft[index].QteAtivo === 0) {
            draft.splice(index, 1);
          }
        })
      );

      if (error) return;

      setFunds(funds + paper.Valor * amount);

      setAllPapers(
        produce(draft => {
          const index = draft.findIndex(p => p.CodAtivo === paper.CodAtivo);

          if (index !== -1) {
            draft[index].QteAtivo += amount;
          } else {
            draft.push({ ...paper, QteAtivo: amount });
          }
        })
      );
    },
    [paper]
  );

  const buyPaper = React.useCallback(
    (amount: number) => {
      let error = false;

      setAllPapers(
        produce(draft => {
          const index = draft.findIndex(p => p.CodAtivo === paper.CodAtivo);
          if (index !== -1 && draft[index].QteAtivo >= amount && funds >= paper.Valor * amount) {
            draft[index].QteAtivo -= amount;
          } else {
            error = true;
            return;
          }

          if (draft[index].QteAtivo === 0) {
            draft.splice(index, 1);
          }
        })
      );

      if (error) return;

      setFunds(funds - paper.Valor * amount);

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
    },
    [paper]
  );

  return { buyPaper, sellPaper };
}
