/* eslint-disable prettier/prettier */
import produce from "immer";
import React from "react";
import { UserContextValue } from "types";
import { supabase } from "utils";

/**
 * Supabase realtime subscriptions are down/not working
 * @see https://github.com/supabase/supabase-js/issues/443
 * @see https://github.com/supabase/supabase/issues/7771
 * @see https://github.com/supabase/realtime/issues/265#issuecomment-1181560093
 */
export default function useRealtime(
  setTransactions: UserContextValue["setTransactions"],
  setUserPapers: UserContextValue["setUserPapers"],
  setAllPapers: UserContextValue["setAllPapers"],
  setFunds: UserContextValue["setFunds"],
) {
  React.useEffect(() => {
    const fundsSubscription = supabase
      .from("clientes")
      .on("UPDATE", (payload) => {
        setFunds(payload.new.saldo);
      })
      .subscribe();

    const userPapersSubscription = supabase
      .from("clientesInvestimentos")
      .on("UPDATE", (payload) => {
        setUserPapers(
          produce((draft) => {
            const index = draft.findIndex(
              (p) => p.codAtivo === payload.new.codAtivo,
            );
            if (index !== -1) {
              draft[index].qtdeAtivo = payload.new.qtdeAtivo;
            }
          }),
        );
      })
      .on("DELETE", (payload) => {
        setUserPapers(
          produce((draft) => {
            const index = draft.findIndex(
              (p) => p.codAtivo === payload.old.codAtivo,
            );
            if (index !== -1) {
              draft.splice(index, 1);
            }
          }),
        );
      })
      .on("INSERT", async (payload) => {
        const { data } = await supabase
          .from("investimentos")
          .select("variacao, valor, nomeAtivo")
          .eq("codAtivo", payload.new.codAtivo);
        let variacao: number, valor: number, nomeAtivo: string;
        if (data) {
          variacao = data[0].variacao;
          valor = data[0].valor;
          nomeAtivo = data[0].nomeAtivo;
        }
        setUserPapers(
          produce((draft) => {
            const index = draft.findIndex(
              (p) => p.codAtivo === payload.new.codAtivo,
            );
            if (index !== -1) {
              draft[index].qtdeAtivo = payload.new.qtdeAtivo;
            } else {
              console.log(payload.new);
              const newPaper = {
                codAtivo: payload.new.codAtivo,
                nomeAtivo,
                qtdeAtivo: payload.new.qtdeAtivo,
                valor,
                variacao,
              };
              draft.push(newPaper);
            }
          }),
        );
      })
      .subscribe();

    const allPapersSubscription = supabase
      .from("investimentos")
      .on("UPDATE", (payload) => {
        setAllPapers(
          produce((draft) => {
            const index = draft.findIndex(
              (p) => p.codAtivo === payload.new.codAtivo,
            );
            if (index !== -1 && payload.new.qtdeAtivo === 0) {
              draft.splice(index, 1);
              return;
            }
            if (index !== -1) {
              draft[index].qtdeAtivo = payload.new.qtdeAtivo;
            } else {
              draft.push(payload.new);
            }
          }),
        );
      })
      .subscribe();

    const transactionsSubcription = supabase
      .from("transacoes")
      .on("INSERT", (payload) => {
        setTransactions(
          produce((draft) => {
            draft.unshift(payload.new);
          }),
        );
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(fundsSubscription);
      supabase.removeSubscription(userPapersSubscription);
      supabase.removeSubscription(allPapersSubscription);
      supabase.removeSubscription(transactionsSubcription);
    };
  }, []);
}
