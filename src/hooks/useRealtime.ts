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
            } else {
              draft.push(payload.new);
            }
          }),
        );
      })
      .on("DELETE", (payload) => {
        setUserPapers(
          produce((draft) => {
            const index = draft.findIndex(
              (p) => p.codAtivo === payload.new.codAtivo,
            );
            if (index !== -1) {
              draft.splice(index, 1);
            }
          }),
        );
      })
      .subscribe();

    const allPapersSubscription = supabase
      .from("investimentos")
      .on("UPDATE", (payload) => {
        console.log(payload);
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
            draft.push(payload.new);
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
