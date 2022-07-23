import supabase from "./supabase";

export default function postTransaction(
  ticker: string,
  { amount, sell }: { amount: number; sell: boolean },
) {
  return supabase.from("transacoes").insert([
    {
      codAtivo: ticker,
      qtdeAtivo: amount,
      venda: sell,
    },
  ]);
}
