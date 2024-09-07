import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Remove ToastContainer
import { useRegisterMutation } from "../../../redux/features/auth/authApi";

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
      data.append("upload_preset", "taskBuddy");
      data.append("cloud_name", "dvwmhlyd6");

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dvwmhlyd6/image/upload",
          {
            method: "POST",
            body: data,
          }
        );

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
  }, [image]);

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const submitData = { ...data, userImage: imageUrl };
      const response = await addData(submitData).unwrap();
      localStorage.setItem("user", JSON.stringify(response));
      reset();
      navigate("/");
      toast.success("Registration successful!");
    } catch (error) {
      console.log(
        error?.data?.errors);
      const errorMessage =
        error?.data?.errors[0].message ||
        "Registration failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 border border-primary bg-opacity-0 rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-slate-100">
        Register Account
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("username", { required: "Name is required" })}
          type="text"
          placeholder="Name"
          className="w-full px-4 py-2 border bg-black bg-opacity-0 text-slate-100  border-gray-300 rounded-md focus:outline-none  "
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
          className="w-full px-4 py-2 border bg-black bg-opacity-0 text-slate-100  border-gray-300 rounded-md focus:outline-none  "
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}

        <select
          {...register("gender", { required: "Gender is required" })}
          className="w-full px-4 py-2 border bg-black text-slate-100   border-gray-300 rounded-md focus:outline-none focus:ring-0 "
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {errors.gender && (
          <span className="text-red-500">{errors.gender.message}</span>
        )}

        <input
          {...register("location", { required: "Location is required" })}
          type="text"
          placeholder="Location"
          className="w-full px-4 py-2 border bg-black bg-opacity-0 text-slate-100  border-gray-300 rounded-md focus:outline-none  "
        />
        {errors.location && (
          <span className="text-red-500">{errors.location.message}</span>
        )}
        <input
          {...register("work", { required: "Work is required" })}
          type="text"
          placeholder="Work"
          className="w-full px-4 py-2 border bg-black bg-opacity-0 text-slate-100  border-gray-300 rounded-md focus:outline-none  "
        />
        {errors.work && (
          <span className="text-red-500">{errors.work.message}</span>
        )}
        <div>
          <label className="block text-gray-100 text-sm  font-semibold mb-2">
            Profile Image:
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border rounded-md bg-black p-1 text-slate-100"
          />
        </div>
        <input
          {...register("age", {
            required: "Age is required",
            valueAsNumber: true,
          })}
          type="number"
          placeholder="Age"
          className="w-full px-4 py-2 border bg-black bg-opacity-0 text-slate-100  border-gray-300 rounded-md focus:outline-none  "
        />
        {errors.age && (
          <span className="text-red-500">{errors.age.message}</span>
        )}

        <input
          {...register("password", {
            required: "Password is required",
            minLength: { value: 8, message: "Minimum length is 8 characters" },
          })}
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border bg-black bg-opacity-0 text-slate-100  border-gray-300 rounded-md focus:outline-none  "
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}

        <input
          {...register("confirmPassword", {
            required: "Confirm password is required",
            validate: (value) => value === password || "Passwords do not match",
          })}
          type="password"
          placeholder="Confirm Password"
          className="w-full px-4 py-2 border bg-black bg-opacity-0 text-slate-100  border-gray-300 rounded-md focus:outline-none  "
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}

        <button
          type="submit"
          className="w-full py-2 mt-5 bg-primary bg-opacity-0 border border-primary text-white font-semibold rounded-md hover:bg-green-700 hover:border-green-700"
          disabled={isRegisterLoading || isUploading}
        >
          {isRegisterLoading || isUploading ? "Please wait..." : "Register Now"}
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
