/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import CSS for react-confirm-alert
import {
  useGetUserByIDArrayQuery,
  useUnfriendUserMutation,
} from "../../../redux/features/friend/friendApi";
import { toast } from "react-toastify";
import { IoPersonRemoveSharp } from "react-icons/io5";
import useAuth from "../../../hooks/useAuth";

const MyFriends = () => {
  const { currentUser } = useAuth();
  const userData = currentUser?.data;
  const myFriendsIdArray = userData?.friends;
  const userId = userData?._id;

  // State to manage friends list
  const [friendsArray, setFriendsArray] = useState([]);

  const { data } = useGetUserByIDArrayQuery(myFriendsIdArray, {
    skip: !myFriendsIdArray,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    refetchOnFocus: true,
  });

  const [unfriendUser, { isLoading, error }] = useUnfriendUserMutation();

  useEffect(() => {
    if (data?.data) {
      setFriendsArray(data.data);
    }
  }, [data]);

  const handleUnfriend = async (friendId) => {
    try {
      const response = await unfriendUser({ userId, friendId }).unwrap();
      toast.success(response.message); // Display the message from the API response

      // Remove the friend from the local state
      setFriendsArray(friendsArray.filter((friend) => friend._id !== friendId));
    } catch (err) {
      console.error("Failed to unfriend:", err);
      toast.error("An error occurred while trying to unfriend.");
    }
  };

  const confirmUnfriend = (friendId, friendName) => {
    confirmAlert({
      title: "Confirm Unfriend",
      message: `Are you sure you want to unfriend ${friendName}?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => handleUnfriend(friendId),
        },
        {
          label: "No",
          onClick: () => toast.info("Action cancelled"),
        },
      ],
    });
  };

  return (
    <div className="bg-chat-background h-screen bg-no-repeat bg-cover">
      <div className="overlay h-full flex flex-col items-center justify-center">
        {friendsArray.length === 0 ? (
          <p className="text-white text-xl mt-5">
            You have no friends. Make some friends! 😳
          </p>
        ) : (
          <div className="flex flex-wrap justify-center">
            {friendsArray.map((friend) => (
              <div key={friend._id} className="mb-4 mt-5">
                <div className="w-[120px] border border-primary p-3 rounded-md bg-primaryDark bg-opacity-40">
                  <Link to={`/profile/${friend._id}`}>
                    <img
                      src={friend.userImage}
                      alt={friend.username}
                      className="w-20 h-20 mx-auto rounded-full"
                    />
                    <div className="text-white text-center mt-2 truncate">
                      <p>{friend.username}</p>
                      <p className="text-sm mt-1">({friend.work})</p>
                    </div>
                  </Link>
                  <button
                    onClick={() => confirmUnfriend(friend._id, friend.username)}
                    disabled={isLoading}
                    className="mt-2 bg-red-500 text-white py-1 px-3 rounded mx-auto flex text-sm"
                  >
                    <IoPersonRemoveSharp />
                  </button>
                  {error && (
                    <p className="text-red-500 mt-2">Error: {error.message}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFriends;
