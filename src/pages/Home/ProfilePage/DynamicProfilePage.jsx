import { useParams } from "react-router-dom";
import { useGetSingleUsersQuery } from "../../../redux/features/user/userApi";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaUserFriends,
  FaBriefcase,
  FaVenusMars,
} from "react-icons/fa";

const DynamicProfilePage = () => {
  const { id } = useParams();
  const { data } = useGetSingleUsersQuery(id, { skip: !id });
  const userData = data?.data;

  return (
    <div className="flex flex-col items-center">
      {/* Cover Image */}
      <div className="w-full h-60 bg-gradient-to-r from-blue-600 to-purple-700 relative">
        {/* Profile Image */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <img
            className="w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-white shadow-xl"
            src={userData?.userImage}
            alt={`${userData?.username}'s profile`}
          />
        </div>
      </div>

      {/* Profile Details */}
      <div className="bg-gray-900 mt-24 p-6 w-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3 rounded-lg shadow-md text-white">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {userData?.username}
        </h2>
        <div className="grid grid-cols-1 gap-4 text-start text-lg">
          <div className="flex items-center">
            <FaBriefcase className="mr-2 text-gray-400" />
            <span className="text-gray-400 me-2">Work: </span> {userData?.work}
          </div>
          <div className="flex items-center">
            <FaVenusMars className="mr-2 text-gray-400" />
            <span className="text-gray-400 me-2">Gender:</span> {userData?.gender}
          </div>
          <div className="flex items-center">
            <FaEnvelope className="mr-2 text-gray-400" />
            <span className="text-gray-400 me-2">Email:</span> {userData?.email}
          </div>
          <div className="flex items-center">
            <FaUserFriends className="mr-2 text-gray-400" />
            <span className="text-gray-400 me-2">Friends:</span>{" "}
            {userData?.friends?.length}
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-2 text-gray-400" />
            <span className="text-gray-400 me-2">Location:</span>{" "}
            {userData?.location}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicProfilePage;
