import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../../redux/features/auth/authApi";

const LoginForm = () => {
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
    <div className="max-w-xs mt-20 p-8 border border-gray-300 rounded-lg shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("email", { required: "Email is required" })}
          type="text"
          placeholder="Email address or phone number"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}

        <input
          {...register("password", { required: "Password is required" })}
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Log in"}
        </button>

        <a href="#" className="block text-center text-blue-500 hover:underline">
          Forgotten password?
        </a>

        <div className="border-t border-gray-300 my-4"></div>
        <Link to={"/sign-up"}>
          <button
            type="button"
            className="w-full py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
          >
            Create new account
          </button>
        </Link>
      </form>
    </div>
  );
};

export default LoginForm;
