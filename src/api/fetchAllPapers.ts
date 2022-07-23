import { supabase } from "api";
import { Paper } from "tests/mocks";

export default async function fetchAllPapers() {
  const { data, error } = await supabase
    .from<Paper>("investimentos")
    .select("*")
    .order("codAtivo", { ascending: true });
  return {
    error,
    data: (data?.filter((paper) => paper.qtdeAtivo > 0) ?? null) as
      | Paper[]
      | null,
  };
}
