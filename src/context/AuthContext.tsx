import { useEffect, useState } from "react";

import { supabase } from "../lib/supabase";
import type { User } from "@supabase/supabase-js";

import { toast } from "sonner";

import { AuthContext } from "../hook/useAuth";
import type { AuthProfile } from "../type/auth";
import { fetchProfile } from "../service/fetchProfile";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<AuthProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) {
        const newProfile = await fetchProfile(session?.user.id);
        setProfile(newProfile);
      }
      setLoading(false);
    };
    initialize();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);

      if (session?.user) {
        const newProfile = await fetchProfile(session?.user.id);
        setProfile(newProfile);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const register = async (
    email: string,
    password: string,
    username: string,
  ) => {
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      },
    );

    if (signUpError) {
      toast.error(`Error signing up: ${signUpError.message}`);
      return { success: false, error: signUpError };
    }

    if (signUpData.user && username) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: signUpData.user.id,
        username,
      });

      if (profileError) {
        toast.error(`Error creating profile: ${profileError.message}`);
        return { success: false, error: profileError };
      }
      return { success: true };
    }
    return { success: true };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      toast.error(`Error signing in: ${error.message}`);
      return { success: false, error };
    }
    return { success: true };
  };

  const updateProfile = async (update: Partial<AuthProfile>) => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    const { error } = await supabase
      .from("profiles")
      .update(update)
      .eq("id", user.id);

    if (error) {
      toast.error("Error updating profile: " + error);
      return { success: false, error };
    }

    // Fetch the updated profile after successful update
    const updatedProfile = await fetchProfile(user.id);
    setProfile(updatedProfile);

    return { success: true };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(`Error signing out: ${error.message}`);
      return { success: false, error };
    }
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        register,
        loading,
        profile,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
