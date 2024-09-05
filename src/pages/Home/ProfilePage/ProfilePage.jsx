import {
  FaBirthdayCake,
  FaMapMarkerAlt,
  FaEnvelope,
  FaUserAlt,
  FaCog,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { useState } from "react";
import Error from "../../../Components/SmallComponents/Error/Error";
import Loader from "../../../Components/SmallComponents/Loader/Loader";
import useAuth from "../../../hooks/useAuth";
import HomeButton from "../../../Components/SmallComponents/HomeButton/HomeButton";
import UpdateProfile from "./UpdateProfile";
import { useGetUserByIDArrayQuery } from "../../../redux/features/user/userApi";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { currentUser, isLoading, isError, refetch } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const userData = currentUser?.data;
  const myFriendsIdArray = userData?.friends;

  const { data } = useGetUserByIDArrayQuery(myFriendsIdArray, {
    skip: !myFriendsIdArray,
  });

  const friendsArray = data?.data;

  //console.log(data?.data);
  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleUpdateClick = () => {
    setShowModal(true);
    setShowDropdown(false); // Close dropdown after clicking
  };

  const handleDeleteClick = () => {
    // Handle delete functionality here
    setShowDropdown(false); // Close dropdown after clicking
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  //console.log(currentUser);

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
    <div className="bg-gray-900 min-h-screen flex flex-col items-center">
      {/* Cover Image */}
      <div className="w-full h-56 bg-gradient-to-r from-purple-500 to-indigo-600 relative">
        {/* Profile Image */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <img
            className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-gray-900 shadow-lg"
            src={userData.userImage}
            alt="Profile"
          />
        </div>
      </div>

      {/* User dropdown*/}
      <div
        className="bg-gray-800 shadow-lg rounded-lg mt-20 p-6 w-11/12 md:w-2/3 lg:w-1/3 xl:w-1/4
       text-white relative"
      >
        <div className="text-center">
          <div className="flex justify-center items-center">
            <p className="text-2xl font-bold mb-2">{userData?.work}</p>
            <FaCog
              className="ml-2 cursor-pointer"
              onClick={handleDropdownToggle}
            />
          </div>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg z-10">
              <ul className="py-1">
                <li
                  className="flex items-center px-4 py-2 text-sm text-white cursor-pointer hover:bg-gray-600"
                  onClick={handleUpdateClick}
                >
                  <FaEdit className="mr-2" /> Update Profile
                </li>
                <li
                  className="flex items-center px-4 py-2 text-sm text-white cursor-pointer hover:bg-gray-600"
                  onClick={handleDeleteClick}
                >
                  <FaTrash className="mr-2" /> Delete Profile
                </li>
              </ul>
            </div>
          )}
          <p className="text-lg text-gray-400 mb-4 flex justify-center items-center">
            <FaMapMarkerAlt className="mr-2" /> {userData?.location}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 text-center ">
          <div className="text-lg">
            <p className="font-semibold mb-2 flex items-center justify-center">
              <FaBirthdayCake className="mr-2 text-gray-400" />
              <span className="text-gray-400 me-2">Age:</span> {userData?.age}
            </p>
            <p className="font-semibold mb-2 flex items-center justify-center">
              <FaUserAlt className="mr-2 text-gray-400" />
              <span className="text-gray-400 me-2">Gender:</span>{" "}
              {userData?.gender}
            </p>
            <p className="font-semibold mb-2 flex items-center justify-center">
              <FaEnvelope className="mr-2 text-gray-400" />
              <span className="text-gray-400 me-2">Email:</span>{" "}
              {userData?.email}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10">
        {friendsArray?.map((friend) => (
          <div key={friend?._id}>
            <Link to={`/profile/${friend?._id}`}>
              <div className="w-[180px] border border-primary p-3 rounded-md">
                <img src={friend?.userImage} />
                <div className="text-white text-center mt-3">
                  <p>{friend?.username}</p>
                  <p>{friend?.work}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Home Button */}
      <div className="mt-6">
        <HomeButton />
      </div>

      {/* Update Profile Modal */}
      {showModal && (
        <UpdateProfile
          userData={userData}
          onClose={handleCloseModal}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default ProfilePage;
