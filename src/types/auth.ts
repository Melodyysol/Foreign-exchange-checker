import type { User } from "@supabase/supabase-js";

type Status = {
  success: boolean;
  error?: Error | null;
};

export type AuthContextType = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<Status>;
  signOut: () => Promise<Status>;
  register: (
    email: string,
    password: string,
    username: string,
  ) => Promise<Status>;
  loading: boolean;
  profile: AuthProfile | null;
  updateProfile: (update: Partial<AuthProfile>) => Promise<Status>;
};

export type AuthProfile = {
  id: string;
  username: string;
  avatar_url?: string;
  created_at: string;
  default_base_currency?: string;
  default_target_currency?: string;
  updated_at?: string;
};
