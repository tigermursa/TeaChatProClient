import useAuth from "../../../hooks/useAuth";
import Error from "../Error/Error";
import Loader from "../Loader/Loader";

const ProfileBar = () => {
  const { currentUser, isLoading, isError } = useAuth();

  console.log(currentUser);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <Error />
      </div>
    );
  }

  return (
    <div>
      <h2 className=" text-white">Welcome to the tea chat</h2>
    </div>
  );
};

export default ProfileBar;
