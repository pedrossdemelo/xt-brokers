import produce from "immer";
import React from "react";
import { Paper } from "tests/mocks";
import useUserData from "./useUserData";

export default function usePaperTransaction(paper: Paper) {
  const { setUserPapers, setAllPapers, funds, setFunds } = useUserData();

  const sellPaper = React.useCallback(
    (amount: number) => {
      let error = false;

      setUserPapers(
        produce((draft) => {
          const index = draft.findIndex((p) => p.codAtivo === paper.codAtivo);

          if (index !== -1 && draft[index].qtdeAtivo >= amount) {
            draft[index].qtdeAtivo -= amount;
          } else {
            error = true;
            return;
          }

          if (draft[index].qtdeAtivo === 0) {
            draft.splice(index, 1);
          }
        }),
      );

      if (error) return;

      setFunds(funds + paper.valor * amount);

      setAllPapers(
        produce((draft) => {
          const index = draft.findIndex((p) => p.codAtivo === paper.codAtivo);

          if (index !== -1) {
            draft[index].qtdeAtivo += amount;
          } else {
            draft.push({ ...paper, qtdeAtivo: amount });
          }
        }),
      );
    },
    [paper],
  );

  const buyPaper = React.useCallback(
    (amount: number) => {
      let error = false;

      setAllPapers(
        produce((draft) => {
          const index = draft.findIndex((p) => p.codAtivo === paper.codAtivo);
          if (
            index !== -1 &&
            draft[index].qtdeAtivo >= amount &&
            funds >= paper.valor * amount
          ) {
            draft[index].qtdeAtivo -= amount;
          } else {
            error = true;
            return;
          }

          if (draft[index].qtdeAtivo === 0) {
            draft.splice(index, 1);
          }
        }),
      );

      if (error) return;

      setFunds(funds - paper.valor * amount);

      setUserPapers(
        produce((draft) => {
          const index = draft.findIndex((p) => p.codAtivo === paper.codAtivo);
          if (index !== -1) {
            draft[index].qtdeAtivo += amount;
          } else {
            draft.push({ ...paper, qtdeAtivo: amount });
          }
        }),
      );
    },
    [paper],
  );

  return { buyPaper, sellPaper };
}
