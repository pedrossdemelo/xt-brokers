import { supabase } from "api";

export default function fetchTransactions() {
  return supabase
    .from("transacoes")
    .select("*")
    .order("data", { ascending: false });
}
