import toast, { Toaster } from "react-hot-toast"; // Import react-hot-toast
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../../redux/features/auth/authApi";

const LogoutButton = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate(); // to navigate after logout

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
      localStorage.removeItem("user");
      navigate("/login");
      toast.success("Logged Out");
    } catch {
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <>
      <button
        onClick={handleLogout}
        className="text-gray-600 hover:text-gray-300 mt-10 border hover:border-blue-600 border-blue-800 p-2 rounded-xl"
        disabled={isLoading}
      >
        {isLoading ? "Logging out..." : "Logout"}
      </button>
      <Toaster />
    </>
  );
};

export default LogoutButton;
