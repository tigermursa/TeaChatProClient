/* eslint-disable no-unused-vars */
import Error from "../../../Components/SmallComponents/Error/Error";
import Loader from "../../../Components/SmallComponents/Loader/Loader";
import LogoutButton from "../../../Components/SmallComponents/LogOut/LogOut";
import useAuth from "../../../hooks/useAuth";

const ProfilePage = () => {
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

  const userData = currentUser.data;

  return (
    <div className="">
      <div className="text-white shadow-md rounded-lg p-6  text-start max-w-[250px]">
        <div>
          <img className="rounded-lg" src={userData.userImage} />
        </div>
        <p className="text-lg  mb-4 font-semibold">
          {userData?.work}
        </p>
        <p className=" mb-2">
          <span className="font-semibold">Age:</span> {userData?.age}
        </p>
        <p className=" mb-2">
          <span className="font-semibold">Location:</span> {userData?.location}
        </p>
        <p className=" mb-2">
          <span className="font-semibold">Gender:</span> {userData?.gender}
        </p>
        <p className="">
          <span className="font-semibold">Email:</span> {userData?.email}
        </p>
      </div>
      <div>
        <LogoutButton />
      </div>
    </div>
  );
};

export default ProfilePage;
