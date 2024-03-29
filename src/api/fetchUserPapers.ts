import { supabase } from "api";
import { Paper } from "tests/mocks";

export default async function fetchUserPapers() {
  const { data, error } = await supabase
    .from("clientesInvestimentos")
    .select(
      `
        codAtivo,
        qtdeAtivo,
        investimentos ( codAtivo, nomeAtivo, valor, variacao )
      `,
    )
    .order("codAtivo", { ascending: true });

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
