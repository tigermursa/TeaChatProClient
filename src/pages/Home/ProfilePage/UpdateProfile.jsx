/* eslint-disable react/prop-types */

import { FaTimes } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useUpdateUserMutation } from "../../../redux/features/user/userApi";

const UpdateProfile = ({ userData, onClose,refetch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: userData,
  });
  const [updateUser, { isLoading}] = useUpdateUserMutation();

  const onSubmit = async (formData) => {
    try {
      await updateUser({ id: formData._id, data: formData });
      refetch()
      onClose();
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg p-8 w-11/12 md:w-1/2 lg:w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Update Profile</h2>
          <button onClick={onClose} aria-label="Close">
            <FaTimes className="cursor-pointer" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-400">Work</label>
            <input
              type="text"
              {...register("work", { required: true })}
              className="w-full p-2 mt-2 bg-gray-700 rounded focus:outline-none"
            />
            {errors.work && (
              <span className="text-red-500">Work is required</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-400">Location</label>
            <input
              type="text"
              {...register("location", { required: true })}
              className="w-full p-2 mt-2 bg-gray-700 rounded focus:outline-none"
            />
            {errors.location && (
              <span className="text-red-500">Location is required</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-400">Age</label>
            <input
              type="number"
              {...register("age", { required: true })}
              className="w-full p-2 mt-2 bg-gray-700 rounded focus:outline-none"
            />
            {errors.age && (
              <span className="text-red-500">Age is required</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-400">Gender</label>
            <input
              type="text"
              {...register("gender", { required: true })}
              className="w-full p-2 mt-2 bg-gray-700 rounded focus:outline-none"
            />
            {errors.gender && (
              <span className="text-red-500">Gender is required</span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-400">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full p-2 mt-2 bg-gray-700 rounded focus:outline-none"
            />
            {errors.email && (
              <span className="text-red-500">Email is required</span>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primary hover:bg-primaryDark text-white px-4 py-2 rounded focus:outline-none"
              disabled={isLoading}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
