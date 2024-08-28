/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../../redux/features/auth/authApi";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const [addData, { isLoading: isRegisterLoading }] = useRegisterMutation();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const saveImage = async () => {
    if (image) {
      setIsUploading(true);
      const data = new FormData();
      data.append("file", image);
      data.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );
      data.append("cloud_name", "dvwmhlyd6");

      try {
        const res = await fetch(import.meta.env.VITE_CLOUDINARY_URL, {
          method: "POST",
          body: data,
        });

        const cloudData = await res.json();
        setImageUrl(cloudData.url);
      } catch (error) {
        console.error("Image upload failed:", error);
        toast.error("Image upload failed. Please try again.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  useEffect(() => {
    if (image) {
      saveImage();
    }
  }, [image, saveImage]);

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const submitData = { ...data, userImage: imageUrl };
      const response = await addData(submitData).unwrap();
      localStorage.setItem("user", JSON.stringify(response));

      toast.success("Registration successful!");

      reset(); // Clear the form
      navigate("/"); // Redirect to home
    } catch (error) {
      const errorMessage =
        error?.data?.error?.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 border border-gray-300 rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("username", { required: "Name is required" })}
          type="text"
          placeholder="Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.username && (
          <span className="text-red-500">{errors.username.message}</span>
        )}

        <input
          {...register("email", {
            required: "Email is required",
            pattern: /^\S+@\S+$/i,
          })}
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}

        <select
          {...register("gender", { required: "Gender is required" })}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {errors.gender && (
          <span className="text-red-500">{errors.gender.message}</span>
        )}

        <input
          {...register("location", { required: "Location is required" })}
          type="text"
          placeholder="Location"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.location && (
          <span className="text-red-500">{errors.location.message}</span>
        )}

        <input
          {...register("age", {
            required: "Age is required",
            valueAsNumber: true,
          })}
          type="number"
          placeholder="Age"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.age && (
          <span className="text-red-500">{errors.age.message}</span>
        )}

        <input
          {...register("work", { required: "Work is required" })}
          type="text"
          placeholder="Work"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.work && (
          <span className="text-red-500">{errors.work.message}</span>
        )}

        <input
          type="file"
          id="userImage"
          onChange={(e) => setImage(e.target.files?.item(0) || null)}
          className="mt-1 p-2 border rounded-md w-full"
        />

        <input
          {...register("password", { required: "Password is required" })}
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}

        <input
          {...register("confirmPassword", {
            required: "Confirm Password is required",
            validate: (value) => value === password || "Passwords do not match",
          })}
          type="password"
          placeholder="Confirm Password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}

        <button
          type="submit"
          className="w-full py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
          disabled={isRegisterLoading || isUploading}
        >
          {isRegisterLoading || isUploading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      <Toaster />
    </div>
  );
};

export default SignUpForm;
