import toast, { Toaster } from "react-hot-toast"; // Import react-hot-toast
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../../redux/features/auth/authApi";

const LogoutButton = () => {
  const [logout, { isLoading }] = useLogoutMutation();
  const navigate = useNavigate(); // to navigate after logout

  const handleLogout = async () => {
    try {
      await logout({}).unwrap();
      localStorage.removeItem("user"); // Clear user data from localStorage

      navigate("/login"); // Redirect to login page after logout
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
      <Toaster /> {/* Add Toaster component for displaying notifications */}
    </>
  );
};

export default LogoutButton;
