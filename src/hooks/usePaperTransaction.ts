import produce from "immer";
import React from "react";
import toast from "react-hot-toast";
import { Paper } from "tests/mocks";
import { postTransaction } from "utils";
import useUserData from "./useUserData";

export default function usePaperTransaction(paper: Paper) {
  const { setUserPapers, setAllPapers, funds, setFunds, setTransactions } =
    useUserData();
  const [loading, setLoading] = React.useState(false);

  const sellPaper = React.useCallback(
    async (amount: number) => {
      setLoading(true);

      const { data, error } = await postTransaction(
        "sell",
        amount,
        paper.codAtivo,
      );

      if (error) {
        toast.error(error.message);
        return setLoading(false);
      }

      if (data) {
        delete data[0].codCliente;
        setTransactions((old) => [data[0], ...old]);
      } else {
        setTransactions((old) => [
          {
            codAtivo: paper.codAtivo,
            data: new Date().toISOString(),
            valor: paper.valor * amount,
            venda: true,
            qtdeAtivo: amount,
            id: old.at(-1)?.id ?? 0 + 1,
          },
          ...old,
        ]);
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

      const { data, error } = await postTransaction(
        "buy",
        amount,
        paper.codAtivo,
      );

      if (error) {
        toast.error(error.message);
        return setLoading(false);
      }

      if (data) {
        delete data[0].codCliente;
        setTransactions((old) => [data[0], ...old]);
      } else {
        setTransactions((old) => [
          {
            codAtivo: paper.codAtivo,
            data: new Date().toISOString(),
            valor: paper.valor * amount,
            venda: true,
            qtdeAtivo: amount,
            id: old.at(-1)?.id ?? 0 + 1,
          },
          ...old,
        ]);
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
