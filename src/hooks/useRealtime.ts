/* eslint-disable prettier/prettier */
import { User } from "@supabase/supabase-js";
import { supabase } from "api";
import produce from "immer";
import React from "react";
import { UserContextValue } from "types";

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
          setFunds((payload.new as { saldo: number }).saldo);
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
          setUserPapers(
            produce((draft) => {
              const index = draft.findIndex(
                (p) => p.codAtivo === (payload.new as any).codAtivo,
              );
              if (index !== -1) {
                draft[index].qtdeAtivo = (payload.new as any).qtdeAtivo;
              }
            }),
          );
        },
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "clientesInvestimentos",
          filter: userFilter,
        },
        (payload) => {
          setUserPapers(
            produce((draft) => {
              const index = draft.findIndex(
                (p) => p.codAtivo === (payload.old as any).codAtivo,
              );
              if (index !== -1) {
                draft.splice(index, 1);
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
          const { data } = await supabase
            .from("investimentos")
            .select("variacao, valor, nomeAtivo")
            .eq("codAtivo", (payload.new as any).codAtivo);
          let variacao: number, valor: number, nomeAtivo: string;
          if (data) {
            variacao = data[0].variacao;
            valor = data[0].valor;
            nomeAtivo = data[0].nomeAtivo;
          }
          setUserPapers(
            produce((draft) => {
              const index = draft.findIndex(
                (p) => p.codAtivo === (payload.new as any).codAtivo,
              );
              if (index !== -1) {
                draft[index].qtdeAtivo = (payload.new as any).qtdeAtivo;
              } else {
                const newPaper = {
                  codAtivo: (payload.new as any).codAtivo,
                  nomeAtivo,
                  qtdeAtivo: (payload.new as any).qtdeAtivo,
                  valor,
                  variacao,
                };
                draft.push(newPaper);
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
          setAllPapers(
            produce((draft) => {
              const index = draft.findIndex(
                (p) => p.codAtivo === (payload.new as any).codAtivo,
              );
              if (index !== -1 && (payload.new as any).qtdeAtivo === 0) {
                draft.splice(index, 1);
                return;
              }
              if (index !== -1) {
                draft[index].qtdeAtivo = (payload.new as any).qtdeAtivo;
              } else {
                draft.push(payload.new as any);
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
        (payload) => {
          setTransactions(
            produce((draft) => {
              draft.unshift(payload.new as any);
            }),
          );
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
