import toast, { Toaster } from "react-hot-toast"; // Import react-hot-toast
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../../redux/features/auth/authApi";

const LogoutSimple = () => {
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
        disabled={isLoading}
      >
        {isLoading ? "Logging out..." : "Logout"}
      </button>
      <Toaster />
    </>
  );
};

export default LogoutSimple;
