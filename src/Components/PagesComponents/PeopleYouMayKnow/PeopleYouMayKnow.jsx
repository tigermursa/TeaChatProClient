import { Img } from "react-image";
import useAuth from "../../../hooks/useAuth";
import {
  useGetNotMyFriendQuery,
  useSentFriendRequestMutation,
} from "../../../redux/features/friend/friendApi";
import { toast } from "react-toastify";
import { useSocket } from "../../../Providers/SocketProvider";
import Loader from "../../SmallComponents/Loader/Loader";

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
      <div className="h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-0 flex   justify-center items-center flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-8">
        {data?.data?.map((user) => (
          <div
            key={user?._id}
            className=" border border-primary rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 w-[180px]"
          >
            <Img
              src={user?.userImage}
              alt={user?.username}
              className="w-full h-32 object-cover rounded-t-lg"
            />
            <div className="p-4 flex flex-col items-center">
              <p className="text-sm font-semibold text-gray-200 mb-2">
                {user?.username}
              </p>
              <button
                onClick={() => handleSendFriendRequest(user?._id)}
                className="px-4 py-2 text-sm bg-primary text-white font-semibold rounded-full hover:bg-primaryDark transition duration-200"
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
  );
};

export default PeopleYouMayKnow;
