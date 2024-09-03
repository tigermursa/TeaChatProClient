/* eslint-disable react/prop-types */
import { FaGlobeAsia } from "react-icons/fa";
import { Link } from "react-router-dom";
import FriendRequests from "../Friend/FriendRequests";
import FindFriends from "../../PagesComponents/FindFriends/FindFriends";
import MyFriends from "../MyFriends/MyFriends";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { IoHome } from "react-icons/io5";
import { useSocket } from "../../../Providers/SocketProvider";

const SmartNav = ({ currentUser, refetch }) => {
  const { getUnreadCount } = useSocket();
  const unreadCount = getUnreadCount();

  console.log(getUnreadCount)
  return (
    <div className="flex items-center justify-center gap-6">
      <Link to={"/"}>
        <IoHome className="text-2xl text-white cursor-pointer" />
      </Link>
      <FriendRequests currentUser={currentUser} refetchUser={refetch} />
      <FaGlobeAsia className="text-2xl text-white cursor-pointer" />
      <FindFriends currentUser={currentUser} refetchUser={refetch} />
      <MyFriends currentUser={currentUser} />
      <Link to={"/chat"}>
        <div className="relative">
          <HiChatBubbleLeftRight className="text-2xl text-white cursor-pointer" />
          {unreadCount > 0 && (
            <div className="absolute -top-2 -right-2 w-3 h-3 bg-red-500 rounded-full border border-white"></div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default SmartNav;
