/* eslint-disable no-unused-vars */
import { Img } from "react-image";
import useAuth from "../../../hooks/useAuth";
import {
  useGetNotMyFriendQuery,
  useSentFriendRequestMutation,
} from "../../../redux/features/friend/friendApi";
import { toast } from "react-toastify"; // Import Toastify

const PeopleYouMayKnow = () => {
  const { currentUser } = useAuth();
  const id = currentUser?.data._id; // senderId
  const { data } = useGetNotMyFriendQuery(id);

  const [sentRequest] = useSentFriendRequestMutation();

  const handleSendFriendRequest = async (receiverId) => {
    try {
      await sentRequest({ senderId: id, receiverId }).unwrap();
      toast.success("Friend request sent successfully ✔");
    } catch (error) {
      toast.error("Failed to send friend request. Please try again.");
    }
  };

  return (
    <div className="p-6 flex justify-center items-center flex-col pt-44">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        People You May Know
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.data?.map((user) => (
          <div
            key={user?._id}
            className="bg-gray-800 bg-opacity-40 border border-primary rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 w-[180px]"
          >
            <Img
              src={user?.userImage}
              alt={user?.username}
              className="w-full h-32 object-cover rounded-t-lg"
            />
            <div className="p-4 flex flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-200 mb-2">
                {user?.username}
              </h3>
              <button
                onClick={() => handleSendFriendRequest(user?._id)}
                className="px-4 py-2 bg-primary text-white font-semibold rounded-full hover:bg-primaryDark transition duration-200"
              >
                Add Friend
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeopleYouMayKnow;
