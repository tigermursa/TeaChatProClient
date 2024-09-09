import { Img } from "react-image";
import useAuth from "../../../hooks/useAuth";
import {
  useGetNotMyFriendQuery,
  useSentFriendRequestMutation,
} from "../../../redux/features/friend/friendApi";
import { toast } from "react-toastify";
import { useSocket } from "../../../Providers/SocketProvider";
import FindFriendSkeleton from "../../Skeletons/FindFriendSkeleton";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
      <div className="h-full flex justify-center">
        <FindFriendSkeleton />
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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    centerMode: false,
    vertical: false,
    swipeToSlide: true,
  };
  return (
    <div className="bg-people-background bg-no-repeat bg-cover bg-bottom h-screen">
      <div className="overlay mx-auto h-full">
        <Slider {...settings} className="pt-5 ms-5 me-5">
          {data?.data?.map((user) => (
            <div
              key={user?._id}
              className="bg-white bg-opacity-0  border border-primary rounded-lg shadow-md overflow-hidden transform transition-all duration-500 hover:shadow-lg "
            >
              <div className="pt-5 bg-gray-200 bg-opacity-0 flex items-center justify-center">
                <Img
                  src={user?.userImage}
                  alt={user?.username}
                  className="w-60 h-60 object-fill bg-center rounded-full"
                />
              </div>
              <div className="p-4  text-center">
                <p className="font-semibold text-gray-100 mb-3 truncate text-2xl font-sans">
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
        </Slider>
      </div>
    </div>
  );
};

export default PYMKMobile;
