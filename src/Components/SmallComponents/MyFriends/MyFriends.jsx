/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import CSS for react-confirm-alert
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
  const { data } = useGetUserByIDArrayQuery(myFriendsIdArray, {
    skip: !myFriendsIdArray,
  });

  const [unfriendUser, { isLoading, error }] = useUnfriendUserMutation();

  const handleUnfriend = async (friendId) => {
    console.log(friendId);
    try {
      const response = await unfriendUser({ userId, friendId }).unwrap();
      toast.success(response.message); // Display the message from the API response
    } catch (err) {
      console.error("Failed to unfriend:", err);
      toast.error("An error occurred while trying to unfriend.");
    }
  };

  // Function to show confirmation dialog
  const confirmUnfriend = (friendId, friendName) => {
    confirmAlert({
      title: 'Confirm Unfriend',
      message: `Are you sure you want to unfriend ${friendName}?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleUnfriend(friendId)
        },
        {
          label: 'No',
          onClick: () => toast.info("Action cancelled") // Optional: Add cancel feedback
        }
      ]
    });
  };

  const friendsArray = data?.data;

  return (
    <div className="bg-chat-background h-screen bg-no-repeat bg-cover">
      <div className="overlay h-full flex flex-wrap justify-center">
        {friendsArray?.map((friend) => (
          <div key={friend?._id} className="mb-4 mt-5">
            <div className="w-[120px] border border-primary p-3 rounded-md bg-primaryDark bg-opacity-40">
              <Link to={`/profile/${friend?._id}`}>
                <img
                  src={friend?.userImage}
                  alt={friend?.username}
                  className="w-20 h-20 mx-auto rounded-full"
                />
                <div className="text-white text-center mt-2 truncate">
                  <p>{friend?.username}</p>
                  <p className="text-sm mt-1">({friend?.work})</p>
                </div>
              </Link>
              <button
                onClick={() => confirmUnfriend(friend?._id, friend?.username)}
                disabled={isLoading}
                className="mt-2 bg-red-500 text-white py-1 px-3 rounded mx-auto flex text-sm "
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
    </div>
  );
};

export default MyFriends;
