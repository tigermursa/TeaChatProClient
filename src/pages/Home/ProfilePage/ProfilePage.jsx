/* eslint-disable no-unused-vars */
import Error from "../../../Components/SmallComponents/Error/Error";
import Loader from "../../../Components/SmallComponents/Loader/Loader";
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
    <div className="bg-gray-900 h-screen flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-6 mx-auto text-start max-w-[250px]">
        <div>
          <img src={userData.userImage} />
        </div>
        <p className="text-lg text-gray-900 mb-4 font-semibold">
          {userData?.work}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Age:</span> {userData?.age}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Location:</span> {userData?.location}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Gender:</span> {userData?.gender}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Email:</span> {userData?.email}
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
