/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { FaUserFriends, FaCheck, FaTimes } from "react-icons/fa";
import {
  useAcceptFriendRequestMutation,
  useGetUserByIDArrayQuery,
  useRejectFriendRequestMutation,
} from "../../../redux/features/friend/friendApi";
import { BiLoaderCircle } from "react-icons/bi";
const FriendRequests = ({ currentUser, refetchUser }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [friendRequestUsers, setFriendRequestUsers] = useState([]);
  const dropdownRef = useRef(null);

  const friendRequestIds = currentUser?.data?.friendRequests || [];
  const userId = currentUser?.data?._id;

  const shouldFetch = friendRequestIds.length > 0;

  const { data, error, isLoading } = useGetUserByIDArrayQuery(
    friendRequestIds,
    {
      skip: !shouldFetch,
      refetchOnFocus: true,
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: true, // Ensures the data is always refetched when component mounts
    }
  );

  const [acceptFriendRequest] = useAcceptFriendRequestMutation();
  const [rejectFriendRequest] = useRejectFriendRequestMutation();

  useEffect(() => {
    if (data && data.data) {
      setFriendRequestUsers(data.data);
    }
  }, [data]);

  const handleIconClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAccept = async (senderId) => {
    try {
      await acceptFriendRequest({ userId, senderId }).unwrap();
      setFriendRequestUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== senderId)
      );
      refetchUser();
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };

  const handleReject = async (senderId) => {
    try {
      await rejectFriendRequest({ userId, senderId }).unwrap();
      setFriendRequestUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== senderId)
      );
      refetchUser();
    } catch (error) {
      console.error("Error rejecting friend request:", error);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isLoading) {
    return (
      <p className="text-white">
        <BiLoaderCircle />
      </p>
    );
  }

  if (error) {
    console.error("Error fetching friend request users:", error);
  }
  const totalFriendRequest = friendRequestIds.length;

  // console.log(totalFriendRequest);
  return (
    <div className="relative">
      <FaUserFriends
        className="text-3xl text-white cursor-pointer"
        onClick={handleIconClick}
      />
      {totalFriendRequest > 0 && (
        <div className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white text-xs">
          {totalFriendRequest}
        </div>
      )}

      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-12 w-80 bg-gray-800 text-white shadow-lg rounded-lg overflow-hidden transition-opacity duration-300 ease-in-out opacity-100"
        >
          {friendRequestUsers.length ? (
            friendRequestUsers.map((user) => (
              <div
                key={user._id}
                className="flex items-center gap-3 p-3 border-b border-gray-700 hover:bg-gray-700 transition-colors"
              >
                <img
                  src={user.userImage}
                  alt={user.username}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <p className="font-semibold">{user.username}</p>
                </div>
                <button
                  className="text-green-400 p-2 rounded-full hover:bg-green-600"
                  onClick={() => handleAccept(user._id)}
                >
                  <FaCheck />
                </button>
                <button
                  className="text-red-400 p-2 rounded-full hover:bg-red-600"
                  onClick={() => handleReject(user._id)}
                >
                  <FaTimes />
                </button>
              </div>
            ))
          ) : (
            <div className="p-4 text-center">No friend requests</div>
          )}
        </div>
      )}
    </div>
  );
};

export default FriendRequests;
