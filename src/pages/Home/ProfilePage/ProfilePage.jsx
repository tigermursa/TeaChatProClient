import {
  FaBirthdayCake,
  FaMapMarkerAlt,
  FaEnvelope,
  FaUserAlt,
  FaCog,
  FaEdit,
  FaTrash,
  FaBriefcase,
} from "react-icons/fa";
import { useState } from "react";
import Error from "../../../Components/SmallComponents/Error/Error";
import Loader from "../../../Components/SmallComponents/Loader/Loader";
import useAuth from "../../../hooks/useAuth";
import UpdateProfile from "./UpdateProfile";

import MyButton from "../../../Components/SmallComponents/HomeButton/HomeButton";

const ProfilePage = () => {
  const { currentUser, isLoading, isError, refetch } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const userData = currentUser?.data;

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
      <div className="w-full  h-[10rem] md:h-[20rem] bg-profile-background bg-no-repeat bg-cover relative">
        {/* Profile Image */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <img
            className="w-32 h-32 md:w-40 md:h-40  rounded-full border-4 border-white shadow-lg object-center"
            src={userData.userImage}
            alt="Profile"
          />
        </div>
      </div>
      <div
        className="bg-gray-800 border-2 border-dotted border-primary shadow-lg rounded-lg mt-20 p-6 w-11/12 md:w-2/3 lg:w-1/3 xl:w-1/4
       text-white relative"
      >
        <div className="">
          <div className="flex justify-center items-center">
            <p className="text-xl sm:text-2xl font-bold mb-2 truncate">
              {userData?.username}
            </p>
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
        </div>

        <div className="grid grid-cols-1 gap-4 text-center p-5">
          <div className="text-lg text-gray-400 space-y-4">
            <p className="flex items-center">
              <FaBriefcase className="mr-2 text-primary" />
              {userData?.work}
            </p>
            <p className="flex items-center">
              <FaMapMarkerAlt className="mr-2 text-primary" />
              {userData?.location}
            </p>
            <p className="flex items-center">
              <FaBirthdayCake className="mr-2 text-primary" />
              <span className="text-gray-400 mr-2">Age:</span> {userData?.age}
            </p>
            <p className="flex items-center">
              <FaUserAlt className="mr-2 text-primary" />
              <span className="text-gray-400 mr-2">Gender:</span>{" "}
              {userData?.gender}
            </p>
            <p className="flex items-center">
              <FaEnvelope className="mr-2 text-primary" />
              <span className="text-gray-400 mr-2">Email:</span>{" "}
              {userData?.email}
            </p>
          </div>
        </div>
      </div>

      {/* <MyFriends myFriendsIdArray={myFriendsIdArray} userId={userId} /> */}

      {/* Home Button */}
      <div className="mt-6">
        <MyButton name={"Friends"} link={"/my-friends"} />
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
