import { Paper } from "tests/mocks";
import { supabase } from "utils";

export default async function fetchAllPapers() {
  const { data, error } = await supabase
    .from<Paper>("investimentos")
    .select("*");
  return {
    error,
    data: (data?.filter((paper) => paper.qtdeAtivo > 0) ?? null) as
      | Paper[]
      | null,
  };
}
