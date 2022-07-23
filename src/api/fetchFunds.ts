import { supabase } from "api";

export default function fetchFunds() {
  return supabase.from<{ saldo: number }>("clientes").select("saldo");
}
