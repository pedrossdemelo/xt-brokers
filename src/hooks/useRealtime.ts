/* eslint-disable prettier/prettier */
import { User } from "@supabase/supabase-js";
import { fetchUserPapers, supabase } from "api";
import produce from "immer";
import React from "react";
import { definitions, UserContextValue } from "types";

/**
 * Supabase realtime subscriptions (v2 API)
 * @see https://supabase.com/docs/guides/realtime
 */
export default function useRealtime(
  setTransactions: UserContextValue["setTransactions"],
  setUserPapers: UserContextValue["setUserPapers"],
  setAllPapers: UserContextValue["setAllPapers"],
  setFunds: UserContextValue["setFunds"],
  user: User | null,
) {
  React.useEffect(() => {
    if (!user) return;

    const userId = user.id;
    const userFilter = `codCliente=eq.${userId}`;

    const fundsChannel = supabase
      .channel(`clientes-changes-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "clientes",
          filter: userFilter,
        },
        (payload) => {
          setFunds((payload.new as definitions["clientes"]).saldo);
        },
      )
      .subscribe();

    const userPapersChannel = supabase
      .channel(`clientesInvestimentos-changes-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "clientesInvestimentos",
          filter: userFilter,
        },
        (payload) => {
          const row = payload.new as definitions["clientesInvestimentos"];
          setUserPapers(
            produce((draft) => {
              const index = draft.findIndex((p) => p.codAtivo === row.codAtivo);
              if (index !== -1) {
                draft[index].qtdeAtivo = row.qtdeAtivo;
              }
            }),
          );
        },
      )
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "clientesInvestimentos",
          filter: userFilter,
        },
        async (payload) => {
          const row = payload.new as definitions["clientesInvestimentos"];
          const { data } = await supabase
            .from("investimentos")
            .select("variacao, valor, nomeAtivo")
            .eq("codAtivo", row.codAtivo);
          let variacao: number, valor: number, nomeAtivo: string;
          if (data) {
            variacao = data[0].variacao;
            valor = data[0].valor;
            nomeAtivo = data[0].nomeAtivo;
          }
          setUserPapers(
            produce((draft) => {
              const index = draft.findIndex((p) => p.codAtivo === row.codAtivo);
              if (index !== -1) {
                draft[index].qtdeAtivo = row.qtdeAtivo;
              } else {
                draft.push({
                  codAtivo: row.codAtivo,
                  nomeAtivo,
                  qtdeAtivo: row.qtdeAtivo,
                  valor,
                  variacao,
                });
              }
            }),
          );
        },
      )
      .subscribe();

    const allPapersChannel = supabase
      .channel("investimentos-changes")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "investimentos" },
        (payload) => {
          const row = payload.new as definitions["investimentos"];
          setAllPapers(
            produce((draft) => {
              const index = draft.findIndex((p) => p.codAtivo === row.codAtivo);
              if (index !== -1 && row.qtdeAtivo === 0) {
                draft.splice(index, 1);
                return;
              }
              if (index !== -1) {
                draft[index].qtdeAtivo = row.qtdeAtivo;
              } else {
                draft.push(row);
              }
            }),
          );
        },
      )
      .subscribe();

    const transactionsChannel = supabase
      .channel("transacoes-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "transacoes" },
        async (payload) => {
          const row = payload.new as definitions["transacoes"];
          setTransactions(
            produce((draft) => {
              draft.unshift(row);
            }),
          );
          if (row.venda) {
            const { data } = await fetchUserPapers();
            if (data) setUserPapers(data);
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(fundsChannel);
      supabase.removeChannel(userPapersChannel);
      supabase.removeChannel(allPapersChannel);
      supabase.removeChannel(transactionsChannel);
    };
  }, [user?.id]);
}
