/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { Img } from "react-image";
import { useGetUserByIDArrayQuery } from "../../../redux/features/friend/friendApi";
import Loader from "../../SmallComponents/Loader/Loader";
import { useSocket } from "../../../Providers/SocketProvider";
import { useState } from "react";

const AvailableUsersMobile = ({
  users,
  handleUserSelect,
  activeUsers,
  friendsArray,
}) => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { unreadMessages, markMessageAsRead } = useSocket();
  const { data, error, isLoading } = useGetUserByIDArrayQuery(friendsArray, {
    skip: friendsArray?.length === 0,
  });

  const friendEmails = data?.data?.map((friend) => friend.email) || [];
  const filteredUsers = users?.filter((userWrapper) =>
    friendEmails.includes(userWrapper.user?.email)
  );

  const handleUserClick = (user) => {
    setSelectedUserId(user.receiverId);
    markMessageAsRead(user.receiverId);
    handleUserSelect(user);
  };

  return (
    <div className="p-4">
      {filteredUsers?.length > 0 ? (
        <div className="flex flex-col space-y-4">
          {filteredUsers.map((userWrapper, index) => {
            const { user } = userWrapper;
            const hasUnreadMessages = !!unreadMessages?.[user.receiverId];
            const isUserOnline = activeUsers.some(
              (activeUser) => activeUser.userId === user.receiverId
            );
            const isSelected = selectedUserId === user.receiverId;

            return (
              <div
                key={index}
                className={`flex items-center p-2 rounded-md ${
                  isSelected ? "bg-primaryDark" : "bg-gray-800"
                } hover:bg-primaryDark cursor-pointer transition duration-300`}
                onClick={() => handleUserClick(user)}
              >
                <div className="relative mr-4">
                  <Img
                    src={user.userImage}
                    alt="user image"
                    width={50}
                    height={50}
                    className="rounded-full border w-[50px] h-[50px] object-cover"
                  />
                  {isUserOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white"></span>
                  )}
                </div>

                <div className="flex-1">
                  <h2 className="text-lg text-white font-bold font-mono">{user?.username}</h2>
                  {hasUnreadMessages && (
                    <span className="text-xs text-red-500">New messages</span>
                  )}
                </div>

                {isSelected && (
                  <button
                    className="text-sm bg-primary bg opacity-0 text-white px-4 py-1 rounded-md"
                    onClick={() => handleUserClick(user)}
                  >
                    Message
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center mx-auto">
          <div className="text-primaryDark text-center flex justify-center items-center w-screen">
            {friendsArray?.length === 0 ? (
              <p className="text-white text-lg font-semibold">
                No Friend to chat 😔
              </p>
            ) : isLoading ? (
              <Loader />
            ) : (
              "No matching friends found."
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailableUsersMobile;
