import { Img } from "react-image";
import useAuth from "../../../hooks/useAuth";
import {
  useGetNotMyFriendQuery,
  useSentFriendRequestMutation,
} from "../../../redux/features/friend/friendApi";
import { toast } from "react-toastify";
import { useSocket } from "../../../Providers/SocketProvider";
import Loader from "../../SmallComponents/Loader/Loader";

const PYMKMobile = () => {
  const { currentUser, refetch } = useAuth();
  const { socket } = useSocket();
  const id = currentUser?.data._id;

  const {
    isFetching,
    isLoading,
    data,
    refetch: fetchAgain,
  } = useGetNotMyFriendQuery(id);
  const [sentRequest] = useSentFriendRequestMutation();

  // Check if data is loading or being fetched
  console.log("Fetched Data:", data); // Debugging line to see if data is fetched

  const handleSendFriendRequest = async (receiverId) => {
    try {
      await sentRequest({ senderId: id, receiverId }).unwrap();
      refetch();
      fetchAgain();
      toast.success("Friend request sent successfully");

      if (socket) {
        socket.emit("sendFriendRequest", { senderId: id, receiverId });
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const sentFriendRequestsArray = currentUser?.data?.sentFriendRequests || [];

  if (isFetching || isLoading) {
    return (
      <div className="h-screen w-full bg-people-background bg-cover bg-no-repeat bg-bottom">
        <div className="overlay h-full w-full flex justify-center items-center">
          <Loader />
        </div>
      </div>
    );
  }

  if (!data?.data?.length) {
    return (
      <div className="h-full flex justify-center items-center">
        <p className="text-white">No friends found</p>
      </div>
    );
  }

  return (
    <div className="bg-people-background bg-no-repeat bg-cover bg-bottom h-screen">
      <div className="overlay mx-auto h-full px-5 py-5">
        {data?.data?.map((user) => (
          <div
            key={user?._id}
            className="w-[250px] mx-auto flex items-center text-center  bg-white bg-opacity-10 border border-primary rounded-lg shadow-md mb-4 p-4"
          >
            <Img
              src={user?.userImage}
              alt={user?.username}
              className="w-12 h-12 object-cover bg-center rounded-full"
            />
            <div className="ml-4 flex-1">
              <p className="font-semibold text-gray-100 mb-2  text-lg truncate">
                {user?.username}
              </p>
              <button
                onClick={() => handleSendFriendRequest(user?._id)}
                className={`w-[100px] py-1 text-sm font-semibold rounded-md transition-colors duration-200 ${
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
  );
};

export default PYMKMobile;
