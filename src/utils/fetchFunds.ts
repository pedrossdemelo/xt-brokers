import { supabase } from "utils";

export default function fetchFunds() {
  return supabase.from<{ saldo: number }>("clientes").select("saldo");
}
