import type { FormInputProps } from "../../type/form";

export const FormInput = ({ register, errors }: FormInputProps) => {
  return (
    <>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          className="input mt-1 md:input-lg"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <p className="text-error text-xs mt-1">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          className="input mt-1 md:input-lg"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        {errors.password && (
          <p className="text-error text-xs mt-1">{errors.password.message}</p>
        )}
      </div>
    </>
  );
};
