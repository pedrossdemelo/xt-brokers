import { supabase } from "utils";

export function fetchUserPapers() {
  return supabase.from("clientesInvestimentos").select(`
        codAtivo,
        qtdeAtivo,
        investimentos ( codAtivo, nomeAtivo, valor, variacao )
      `);
}
