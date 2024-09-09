/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { BsChatLeftText } from "react-icons/bs";
import { Img } from "react-image";
import { useGetUserByIDArrayQuery } from "../../../redux/features/friend/friendApi";
import Loader from "../../SmallComponents/Loader/Loader";
import { useSocket } from "../../../Providers/SocketProvider";

const AvailableUsersDesktop = ({
  users,
  handleUserSelect,
  activeUsers,
  friendsArray,
}) => {
  const { unreadMessages, markMessageAsRead } = useSocket();
  const { data, error, isLoading } = useGetUserByIDArrayQuery(friendsArray, {
    skip: friendsArray?.length === 0,
  });

  const friendEmails = data?.data?.map((friend) => friend.email) || [];
  const filteredUsers = users?.filter((userWrapper) =>
    friendEmails.includes(userWrapper.user?.email)
  );

  return (
    <div className="border-8 border-red-600">
      <div className="flex flex-wrap justify-center">
        {filteredUsers?.length > 0 ? (
          filteredUsers.map((userWrapper, index) => {
            const { user } = userWrapper;
            const hasUnreadMessages = !!unreadMessages?.[user.receiverId];
            const isUserOnline = activeUsers.some(
              (activeUser) => activeUser.userId === user.receiverId
            );

            return (
              <div key={index} className="px-5 py-5">
                <div className="h-auto rounded-xl bg-center p-4 border hover:border-primary w-[180px] shadow-2xl shadow-primary hover:shadow-xl cursor-pointer relative">
                  {hasUnreadMessages && (
                    <div className="absolute -top-5 -right-2 text-nowrap text-xs text-white p-2 rounded-full bg-red-500 blink">
                      New
                    </div>
                  )}

                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <Img
                        src={user.userImage}
                        alt="mentor image"
                        width={100}
                        height={100}
                        className="rounded-full border w-[100px] h-[100px] object-cover"
                      />
                      {isUserOnline && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white"></span>
                      )}
                    </div>

                    <h2 className="mt-4 text-sm text-white font-bold">
                      {user?.username}
                    </h2>
                    <div className="mt-[25px] border text-xs text-white p-2 rounded-md hover:bg-primary hover:font-semibold">
                      <button
                        className=""
                        onClick={() => {
                          handleUserSelect(user);
                          markMessageAsRead(user.receiverId);
                        }}
                      >
                        MESSAGE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="h-screen flex justify-center items-center mx-auto">
            <div className="text-primaryDark text-center flex justify-center items-center  w-screen">
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
    </div>
  );
};

export default AvailableUsersDesktop;
