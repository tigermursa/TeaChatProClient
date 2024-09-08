import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../redux/features/auth/authApi";
import { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const {
    register,
    handleSubmit,
    reset, // used to clear the form
    formState: { errors },
  } = useForm();

  const navigate = useNavigate(); // initialize navigate function
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data) => {
    try {
      // Attempt to log in
      const response = await login(data).unwrap();

      // Notify user of successful login
      const successMessage = response?.message || "Login successful!";

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(response));

      // Clear the form
      reset();
      navigate("/");
      toast.success(successMessage);
    } catch (error) {
      // Handle API errors
      const errorMessage =
        error?.data?.error?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-xs mt-20 p-8 border border-primary hover:border-primaryLight rounded-lg shadow-md ">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("email", { required: "Email is required" })}
          type="text"
          placeholder="Email address or phone number"
          className="w-full px-4 py-2 border bg-black bg-opacity-0 text-slate-100 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}

        <div className="relative">
          <input
            {...register("password", { required: "Password is required" })}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full px-4 py-2 pr-10 border bg-black bg-opacity-0 text-slate-100 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <IoIosEyeOff className="text-white" />
            ) : (
              <IoIosEye className="text-white" />
            )}
          </div>
        </div>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}

        <button
          type="submit"
          className="w-full py-2 bg-primary bg-opacity-0 border border-primary text-white font-semibold rounded-md hover:bg-primary"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Log in"}
        </button>

        <a href="#" className="block text-center text-blue-500 hover:underline">
          Forgotten password?
        </a>

        <div className=" border-gray-300 my-4"></div>
        <Link to={"/sign-up"}>
          <button
            type="button"
            className="w-full py-2 bg-green-500 bg-opacity-0 border border-primary text-white font-semibold rounded-md hover:bg-green-600 hover:border-green-600"
          >
            Create new account
          </button>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
