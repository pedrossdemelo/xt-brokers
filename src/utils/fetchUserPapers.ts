import { Paper } from "tests/mocks";
import { supabase } from "utils";

export default async function fetchUserPapers() {
  const { data, error } = await supabase.from("clientesInvestimentos").select(`
        codAtivo,
        qtdeAtivo,
        investimentos ( codAtivo, nomeAtivo, valor, variacao )
      `);

  return {
    error,
    data: (data?.map((paper: any) => {
      const { codAtivo, qtdeAtivo, investimentos } = paper;
      const { nomeAtivo, valor, variacao } = investimentos;
      return {
        codAtivo,
        qtdeAtivo,
        nomeAtivo,
        valor,
        variacao,
      };
    }) ?? null) as Paper[] | null,
  };
}
