import { Transaction } from "tests/mocks";
import { supabase } from "utils";

export default function fetchTransactions() {
  return supabase.from<Transaction>("transacoes").select(`
        codAtivo,
        data,
        venda,
        qtdeAtivo,
        valor
      `);
}
