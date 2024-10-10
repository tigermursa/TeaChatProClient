import { Img } from "react-image";
import useAuth from "../../../hooks/useAuth";
import {
  useGetNotMyFriendQuery,
  useSentFriendRequestMutation,
} from "../../../redux/features/friend/friendApi";
import { toast } from "react-toastify";
import { useSocket } from "../../../Providers/SocketProvider";

const PYMKDesktop = () => {
  const { currentUser, refetch } = useAuth();
  const { socket } = useSocket(); // Access the socket instance
  const id = currentUser?.data._id; // senderId
  const { data, refetch: fetchAgain } = useGetNotMyFriendQuery(id);
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

  return (
    <div className="bg-people-background h-screen bg-no-repeat bg-cover bg-bottom">
      <div className="overlay h-screen flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center pt-5">
          {/* Card starts from here */}
          {data?.data?.map((user) => (
            <div
              key={user?._id}
              className="bg-white bg-opacity-0 w-[150px] lg:w-[200px] h-[250px] border border-primary rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg"
            >
              <div className="pt-5 bg-gray-200 bg-opacity-0 flex items-center justify-center">
                <Img
                  src={user?.userImage}
                  alt={user?.username}
                  className="w-24 h-24 object-fill bg-center rounded-full"
                />
              </div>
              <div className="p-4 text-center">
                <p className="font-semibold text-gray-100 mb-3 truncate text-sm lg:text-lg">
                  {user?.username}
                </p>
                <button
                  onClick={() => handleSendFriendRequest(user?._id)}
                  className={`w-full py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
                    sentFriendRequestsArray.includes(user?._id)
                      ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                      : "bg-primary bg-opacity-30 border border-primary text-white hover:bg-primary"
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

export default PYMKDesktop;
