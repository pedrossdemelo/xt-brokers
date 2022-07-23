import { supabase } from "api";
import { Transaction } from "tests/mocks";

export default function fetchTransactions() {
  return supabase
    .from<Transaction>("transacoes")
    .select("*")
    .order("data", { ascending: false });
}
