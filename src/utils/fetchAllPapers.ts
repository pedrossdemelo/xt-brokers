import { Paper } from "tests/mocks";
import { supabase } from "utils";

export default function fetchAllPapers() {
  return supabase.from<Paper>("investimentos").select("*");
}
