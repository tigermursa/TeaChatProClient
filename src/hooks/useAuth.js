import { useGetUserQuery } from "../redux/features/auth/authApi";

const useAuth = () => {
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = storedUser?._id;

  // Fetch user data using the userId from localStorage
  const {
    data: currentUser,
    isLoading,
    isError,
    refetch,
  } = useGetUserQuery(userId || "", {
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });

  const isLoggedIn = !!currentUser;

  return { currentUser, isLoggedIn, isLoading, isError, refetch };
};

export default useAuth;
