import { Img } from "react-image";
import useAuth from "../../../hooks/useAuth";
import {
  useGetNotMyFriendQuery,
  useSentFriendRequestMutation,
} from "../../../redux/features/friend/friendApi";
import { toast } from "react-toastify";
import { useSocket } from "../../../Providers/SocketProvider";
import FindFriendSkeleton from "../../Skeletons/FindFriendSkeleton";

const PeopleYouMayKnow = () => {
  const { currentUser, refetch } = useAuth();
  const { socket } = useSocket(); // Access the socket instance
  const id = currentUser?.data._id; // senderId
  const {
    isFetching,
    isLoading,
    data,
    refetch: fetchAgain,
  } = useGetNotMyFriendQuery(id);
  const [sentRequest] = useSentFriendRequestMutation();

  const handleSendFriendRequest = async (receiverId) => {
    try {
      await sentRequest({ senderId: id, receiverId }).unwrap();
      refetch();
      fetchAgain();
      toast.success("Friend request sent successfully");

      // Emit the friend request event via Socket.IO
      if (socket) {
        socket.emit("sendFriendRequest", {
          senderId: id,
          receiverId,
        });
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const sentFriendRequestsArray = currentUser?.data?.sentFriendRequests || [];

  if (isFetching || isLoading) {
    return (
      <div className="h-full flex justify-center">
        <FindFriendSkeleton />
      </div>
    );
  }

  return (
    <div className="bg-people-background h-screen">
      <div className="overlay h-screen">
        <div className="flex flex-wrap gap-8 justify-center pt-5">
          {data?.data?.map((user) => (
            <div
              key={user?._id}
              className="border border-primary rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 w-[240px] hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative w-full h-40 bg-gradient-to-r from-primary to-primaryDark">
                <Img
                  src={user?.userImage}
                  alt={user?.username}
                  className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 w-24 h-24 object-cover rounded-full border-4 border-white shadow-lg"
                />
              </div>
              <div className="p-6 flex flex-col items-center">
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  {user?.username}
                </p>
                <button
                  onClick={() => handleSendFriendRequest(user?._id)}
                  className={`px-6 py-2 text-sm font-semibold rounded-full transition-colors duration-200 ${
                    sentFriendRequestsArray.includes(user?._id)
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-primary text-white hover:bg-primaryDark"
                  }`}
                  disabled={sentFriendRequestsArray.includes(user?._id)}
                >
                  {sentFriendRequestsArray.includes(user?._id)
                    ? "Request Sent"
                    : "Add Friend"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PeopleYouMayKnow;
