import supabase from "./supabase";

export default function postTransaction(
  type: "sell" | "buy",
  amount: number,
  ticker: string,
) {
  return supabase.from("transacoes").insert([
    {
      codAtivo: ticker,
      qtdeAtivo: amount,
      venda: type === "sell",
    },
  ]);
}
