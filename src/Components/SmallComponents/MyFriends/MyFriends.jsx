/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import {
  useGetUserByIDArrayQuery,
  useUnfriendUserMutation,
} from "../../../redux/features/friend/friendApi";
import { toast } from "react-toastify";
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

  const friendsArray = data?.data;

  return (
    <div>
      <div className="mt-10">
        {friendsArray?.map((friend) => (
          <div key={friend?._id} className="mb-4">
            <div className="w-[180px] border border-primary p-3 rounded-md">
              <Link to={`/profile/${friend?._id}`}>
                <img src={friend?.userImage} alt={friend?.username} />
                <div className="text-white text-center mt-3 truncate">
                  <p>{friend?.username}</p>
                  <p className="text-sm mt-2">({friend?.work})</p>
                </div>
              </Link>
              <button
                onClick={() => handleUnfriend(friend?._id)}
                disabled={isLoading}
                className="mt-2 bg-red-500 text-white py-1 px-3 rounded mx-auto flex mt-4"
              >
                {isLoading ? "Unfriending..." : "Unfriend"}
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
