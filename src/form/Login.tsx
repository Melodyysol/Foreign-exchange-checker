import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";

import { Header } from "../layouts/Header";
import { FormInput } from "./shared/FormInput";

import type { FormData } from "../type/form";
import useAuth from "../custom-hook/UseAuth";

export const Login = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const { signIn } = useAuth();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const result = await signIn(data.email, data.password);
    if (!result.success) {
      alert(`Error logging in: ${result.error?.message}`);
      reset();
      throw new Error(`Error logging in: ${result.error?.message}`);
    } else {
      alert("Login successful!");
      navigate("/");
    }
  };

  return (
    <>
      <Header />
      <main className="h-[80vh] flex items-center">
        <form
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
          className="bg-base-300 p-4 mx-auto w-64 md:w-[20rem] rounded-2xl shadow hover:shadow-md shadow-olive-50"
        >
          <div>
            <h1 className="text-center text-2xl uppercase font-bold md:text-4xl">
              Login
            </h1>
            <div className="w-15 h-1 rounded-full bg-warning mx-auto my-2"></div>
          </div>

          <div className="flex flex-col gap-5">
            <FormInput errors={errors} register={register} />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`btn md:btn-lg ${isSubmitting ? "btn-neutral" : "btn-accent"} btn-block mt-5`}
          >
            {isSubmitting ? "Submitting" : "Submit"}
          </button>
          <p className="mt-5 text-sm text-info text-center">
            Don't have an account?{" "}
            <span
              className="link link-hover link-success"
              onClick={() => navigate("/register")}
            >
              Sign up
            </span>
          </p>
        </form>
      </main>
    </>
  );
};
