import { supabase } from "api";

export default function fetchFunds() {
  return supabase.from("clientes").select("saldo");
}
