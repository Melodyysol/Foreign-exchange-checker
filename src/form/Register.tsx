import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";

import { Header } from "../layouts/Header";
import useAuth from "../custom-hook/UseAuth";
import { FormInput } from "./shared/FormInput";

import type { FormData } from "../type/form";
import { useEffect } from "react";
import { toast } from "sonner";

export const Register = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    shouldUseNativeValidation: true,
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  useEffect(() => {
    reset(); // Reset form fields when the component mounts
  }, [reset]);

  const { register: registerFunction } = useAuth();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!data.username) {
      toast.error("Username is required");
      reset();
      return;
    }

    const result = await registerFunction(
      data.email,
      data.password,
      data.username,
    );
    if (!result.success) {
      reset();
      throw new Error(`Error registering: ${result.error?.message}`);
    } else {
      toast.success("Registration successful!");
      navigate("/login");
    }
  };

  return (
    <>
      <Header />
      <main className="h-[90vh] flex items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-base-300 p-4 mx-auto w-76 md:w-88 rounded-2xl shadow hover:shadow-md shadow-olive-50"
        >
          <div>
            <h1 className="text-center text-2xl uppercase font-bold md:text-4xl">
              Register
            </h1>
            <div className="w-15 h-1 rounded-full bg-warning mx-auto my-2"></div>
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                className="input mt-1 md:input-lg"
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be atleast 3 characters",
                  },
                })}
              />
              {errors.username && (
                <p className="text-error text-xs mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>
            <FormInput errors={errors} register={register} />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn md:btn-lg btn-accent btn-block mt-5"
          >
            {isSubmitting ? "Submitting" : "Submit"}
          </button>
          <p className="mt-5 text-sm text-info text-center">
            Already have an account?{" "}
            <span
              role="button"
              className="link link-hover link-success"
              onClick={() => navigate("/login")}
            >
              Sign in
            </span>
          </p>
        </form>
      </main>
    </>
  );
};
