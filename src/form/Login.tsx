import { useNavigate } from "react-router-dom";
import { Header } from "../layouts/Header";

export const Login = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <main className="h-[80vh] flex items-center">
        <form className="bg-base-300 p-4 mx-auto w-64 md:w-[20rem] rounded-2xl shadow hover:shadow-md shadow-olive-50">
          <div>
            <h1 className="text-center text-2xl uppercase font-bold md:text-4xl">
              Login
            </h1>
            <div className="w-15 h-1 rounded-full bg-warning mx-auto my-2"></div>
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" className="input mt-1 md:input-lg" />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" className="input mt-1 md:input-lg" />
            </div>
          </div>
          <button
            type="submit"
            className="btn md:btn-lg btn-accent btn-block mt-5"
          >
            Submit
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
