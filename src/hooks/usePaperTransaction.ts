import produce from "immer";
import React from "react";
import { Paper } from "tests/mocks";
import { postTransaction, supabase } from "utils";
import useUserData from "./useUserData";

export default function usePaperTransaction(paper: Paper) {
  const { setUserPapers, setAllPapers, funds, setFunds } = useUserData();
  const [loading, setLoading] = React.useState(false);

  const sellPaper = React.useCallback(
    async (amount: number) => {
      console.log(supabase.getSubscriptions());
      setLoading(true);
      const { error } = await postTransaction("sell", amount, paper.codAtivo);

      if (error) {
        // TODO: inform user with error toast
        console.error(error);
        return setLoading(false);
      }

      setUserPapers(
        produce((draft) => {
          const index = draft.findIndex((p) => p.codAtivo === paper.codAtivo);

          if (index !== -1) {
            draft[index].qtdeAtivo -= amount;
          }

          if (draft[index].qtdeAtivo <= 0) {
            draft.splice(index, 1);
          }
        }),
      );

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

      setLoading(false);
    },
    [paper],
  );

  const buyPaper = React.useCallback(
    async (amount: number) => {
      setLoading(true);
      const { error } = await postTransaction("buy", amount, paper.codAtivo);

      if (error) {
        // TODO: inform user with error toast
        console.error(error);
        return setLoading(false);
      }

      setAllPapers(
        produce((draft) => {
          const index = draft.findIndex((p) => p.codAtivo === paper.codAtivo);
          if (index !== -1) {
            draft[index].qtdeAtivo -= amount;
          }

          if (draft[index].qtdeAtivo <= 0) {
            draft.splice(index, 1);
          }
        }),
      );

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
      setLoading(false);
    },
    [paper],
  );

  return { buyPaper, sellPaper, loading };
}
