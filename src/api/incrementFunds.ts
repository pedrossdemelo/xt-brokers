import supabase from "./supabase";

export default async function incrementFunds(amount: number) {
  const { data, error } = await supabase.rpc("increment_funds", { amount });
  return { data: data as null | number, error };
}
