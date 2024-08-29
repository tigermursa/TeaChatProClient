import { toast } from "react-toastify"; // Import react-toastify
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
      toast.success("Logged out successfully!");
    } catch {
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <>
      <button
        onClick={handleLogout}
        className="text-gray-200 font-semibold hover:text-gray-300 mt-10 border-[2px] hover:border-primaryDark border-primary p-2 rounded-xl me-5"
        disabled={isLoading}
      >
        {isLoading ? "Logging out..." : "Logout"}
      </button>
    </>
  );
};

export default LogoutButton;
