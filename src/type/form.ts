import type { FieldErrors, UseFormRegister } from "react-hook-form";

export type FormData = {
  email: string;
  password: string;
  username?: string; // Optional username field for registration
};

export type FormInputProps = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
};
