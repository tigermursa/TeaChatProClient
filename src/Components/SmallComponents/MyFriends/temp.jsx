/* eslint-disable react/prop-types */
import { Img } from "react-image";
import { useGetUserByIDArrayQuery } from "../../../redux/features/friend/friendApi";
import { FaUserFriends } from "react-icons/fa";
const MyFriends = ({ currentUser }) => {
  const MyFriendsArray = currentUser?.data?.friends;
  const shouldFetch = MyFriendsArray.length > 0;
  const { data, error, isLoading } = useGetUserByIDArrayQuery(MyFriendsArray, {
    skip: !shouldFetch,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading friends</p>;
  //<h3 className="text-white mb-5 text-center">My Friends ({MyFriendsArray?.length})</h3>
  return (

    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
    <FaUserFriends />
      {data?.data?.map((friend) => (
        <div
          key={friend._id}
          className="bg-gray-800 bg-opacity-60 border border-primary rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105"
        >
          <Img
            src={friend?.userImage}
            alt={friend?.username}
            className="w-full h-40 object-cover rounded-t-lg"
          />
          <div className="p-4 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-200">
              {friend?.username} ({friend?.age})
            </h3>
            <h3 className="text-lg font-semibold text-gray-200">
              {friend?.work}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyFriends;
