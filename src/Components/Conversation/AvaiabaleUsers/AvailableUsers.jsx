/* eslint-disable react/prop-types */

import { BsChatLeftText } from "react-icons/bs";
import { Img } from "react-image";

const AvailableUsers = ({
  users,
  handleUserSelect,
  unreadMessages,
  activeUsers,
}) => {
  return (
    <div className="flex justify-center border border-red-600 ">
      <div className="grid md:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4  gap-8">
        {users?.length > 0 ? (
          users.map((userWrapper, index) => {
            const { user } = userWrapper;
            const hasUnreadMessages = !!unreadMessages?.[user.receiverId];

            // Check if the user is online
            const isUserOnline = activeUsers.some(
              (activeUser) => activeUser.userId === user.receiverId
            );
    
            return (
              <div key={index} className="flex flex-wrap justify-center">
                <div className="w-full h-auto rounded-xl bg-center p-4 border shadow-md hover:shadow-xl cursor-pointer relative">
                  {hasUnreadMessages && (
                    <div className="absolute -top-5 -right-2 text-nowrap text-xs text-white p-2 rounded-full bg-red-500 blink">
                      New
                    </div>
                  )}

                  <div className="flex flex-col items-center">
                    <div className="relative">
                      {/* Profile Image */}
                      <Img
                        src={user.userImage}
                        alt="mentor image"
                        width={100}
                        height={100}
                        className="rounded-full border w-[100px] h-[100px] object-cover"
                      />
                      {/* Online Status Indicator */}
                      {isUserOnline && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white"></span>
                      )}
                    </div>

                    <h2 className="mt-4 text-[18px] text-[#202224] font-bold">
                      {user?.username}
                    </h2>
                    <div className="mt-[25px]">
                      <button
                        className="flex text-[10.8px] items-center justify-center ms-5 pt-[5px] pb-[5px] px-[4px] text-center w-[112px] border text-[#172B4D] hover:text-white hover:bg-[#172B4D] bg-white rounded"
                        onClick={() => handleUserSelect(user)}
                      >
                        <span className="">
                          <BsChatLeftText className="text-[12px]" />
                        </span>
                        MESSAGE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="">
            <p className="text-primaryDark h-screen flex justify-center items-center">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvailableUsers;
