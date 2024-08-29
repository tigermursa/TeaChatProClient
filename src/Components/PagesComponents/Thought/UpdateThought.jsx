/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useGetThoughtByUserIdQuery,
  useUpdateThoughtMutation,
} from "../../../redux/features/thought/thoughtApi";
import toast from "react-hot-toast";

const UpdateThought = ({ thoughtData, onClose, user }) => {
  const id = user?._id;
  const { data } = useGetThoughtByUserIdQuery(id);
  const [updateThought, { isLoading, isError }] = useUpdateThoughtMutation();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { text: thoughtData.text || "" },
  });

  const thoughtID = data?.data?._id;
  useEffect(() => {
    if (data?.data?.text) {
      reset({ text: data.data.text });
    }
  }, [data, reset]);

  const onSubmit = async (data) => {
    const updatedThought = {
      text: data.text,
      name: user?.username || "Anonymous",
    };

    try {
      await updateThought({
        id: thoughtID,
        data: updatedThought,
      }).unwrap();
      reset(); // Reset form values
      toast.success("Thought updated successfully!");
      onClose(); // Close the modal on success
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Failed to update thought. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-lg">
      <h2 className="text-2xl font-semibold text-white mb-4 text-center">
        Update Your Thought
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            id="text"
            type="text"
            {...register("text", { required: true })} // Register field with react-hook-form
            placeholder="Enter your updated thought"
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          {isLoading ? "Submitting..." : "Update"}
        </button>
        {isError && (
          <p className="text-red-500 text-center mt-2">
            Failed to update thought. Please try again.
          </p>
        )}
      </form>
    </div>
  );
};

export default UpdateThought;
