/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useForm } from "react-hook-form";
import { useAddThoughtMutation } from "../../../redux/features/thought/thoughtApi";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";

const CreateThought = ({ onClose }) => {
  const { register, handleSubmit, reset } = useForm();
  const [addThought, { isLoading, isError }] = useAddThoughtMutation();
  const { currentUser } = useAuth();
  const user = currentUser?.data;

  const onSubmit = async (data) => {
    const thoughtData = {
      text: data.text,
      name: user?.username || "Anonymous",
      userId: user?._id,
    };

    try {
      await addThought(thoughtData).unwrap();
      reset();
      toast.success("Thought created successfully!");
      onClose();
    } catch (error) {
      toast.error(error.data.message || "Failed to create thought.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-lg bg-gray-800">
      <h2 className="text-2xl font-semibold text-white mb-4 text-center">
        Share Your Thought Now
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            id="text"
            type="text"
            {...register("text", { required: "Thought is required" })}
            placeholder="Enter your thought"
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
        {isError && (
          <p className="text-red-500 text-center mt-2">
            You can update your current thought 😉
          </p>
        )}
      </form>
    </div>
  );
};

export default CreateThought;
