import { useGetUserQuery } from "../redux/features/auth/authApi";

const useAuth = () => {
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = storedUser?._id;

  // Fetch user data using the userId from my localStorage
  const {
    data: currentUser,
    isLoading,
    isError,
  } = useGetUserQuery(userId || "");

  const isLoggedIn = !!currentUser;

  return { currentUser, isLoggedIn, isLoading, isError };
};

export default useAuth;
