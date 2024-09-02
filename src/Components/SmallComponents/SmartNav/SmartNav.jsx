/* eslint-disable react/prop-types */
import { FaGlobeAsia } from "react-icons/fa";
import { Link } from "react-router-dom";
import FriendRequests from "../Friend/FriendRequests";
import FindFriends from "../../PagesComponents/FindFriends/FindFriends";
import MyFriends from "../MyFriends/MyFriends";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
const SmartNav = ({ currentUser, refetch }) => {
  return (
    <div className="flex items-center justify-center gap-6">
      <FriendRequests currentUser={currentUser} refetchUser={refetch} />
      <FaGlobeAsia className="text-2xl text-white cursor-pointer" />
      <FindFriends currentUser={currentUser} refetchUser={refetch} />
      <MyFriends currentUser={currentUser} />
      <Link to={"/chat"}>
        <HiChatBubbleLeftRight className="text-2xl text-white cursor-pointer" />
      </Link>
    </div>
  );
};

export default SmartNav;
