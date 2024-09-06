/* eslint-disable react/prop-types */
import { FaGlobeAsia, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import FriendRequests from "../Friend/FriendRequests";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { IoHome } from "react-icons/io5";
import { useSocket } from "../../../Providers/SocketProvider";

const SmartNav = ({ currentUser, refetch }) => {
  const { getUnreadCount } = useSocket();
  const unreadCount = getUnreadCount();

  return (
    <div className="flex items-center justify-center gap-6">
      <Link to={"/"}>
        <IoHome className="text-lg md:text-2xl text-white cursor-pointer" />
      </Link>
      <FriendRequests currentUser={currentUser} refetchUser={refetch} />
      <FaGlobeAsia className="text-lg md:text-2xl text-white cursor-pointer" />
      <Link to={"/people"}>
        <FaSearch className="text-lg md:text-2xl text-white cursor-pointer"/>
      </Link>
      <Link to={"/chat"}>
        <div className="relative">
          <HiChatBubbleLeftRight className="text-lg md:text-3xl text-white cursor-pointer" />
          {unreadCount > 0 && (
            <div className="absolute -top-2 -right-4 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {unreadCount}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default SmartNav;
