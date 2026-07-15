import { supabase } from "../lib/supabase";
import type { AuthProfile } from "../types/auth";

export const fetchProfile = async (id: string): Promise<AuthProfile> => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }
  return data;
};
