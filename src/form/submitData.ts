import type { NavigateFunction } from "react-router-dom";
import { supabase } from "../lib/supabase";
import type { FormData } from "../type/form";
import type { UseFormReset } from "react-hook-form";

const loginData = async (
  data: FormData,
  reset: UseFormReset<FormData>,
  navigate: NavigateFunction,
) => {
  const { email, password } = data;
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error("Error logging in:", error.message);
    alert(`Error logging in: ${error.message}`);
    reset(); // Reset the form fields after an error
    return;
  } else {
    alert("Login successful!");
    navigate("/");
  }
};

const registerData = async (
  data: FormData,
  reset: UseFormReset<FormData>,
  navigate: NavigateFunction,
) => {
  const { email, password, username } = data;
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  });

  if (signUpError) {
    console.error("Error registering:", signUpError.message);
    alert(`Error registering: ${signUpError.message}`);
    reset(); // Reset the form fields after an error
    return;
  }
  if (signUpData.user) {
    const { error: profileError } = await supabase.from("profiles").insert({
      id: signUpData.user.id,
      username,
    });

    if (profileError) {
      console.error("Error creating profile:", profileError.message);
      alert(`Error creating profile: ${profileError.message}`);
      reset(); // Reset the form fields after an error
      return;
    } else {
      alert(
        "Registration successful! Please check your email to confirm your account.",
      );
      navigate("/login");
    }
  }
};

export { loginData, registerData };
