/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { BsChatLeftText } from "react-icons/bs";
import { Img } from "react-image";
import { useGetUserByIDArrayQuery } from "../../../redux/features/friend/friendApi";
import Loader from "../../SmallComponents/Loader/Loader";

const AvailableUsers = ({
  users,
  handleUserSelect,
  unreadMessages,
  activeUsers,
  friendsArray,
}) => {
  // Always call the hook
  const { data, error, isLoading } = useGetUserByIDArrayQuery(friendsArray, {
    skip: friendsArray?.length === 0,
  });

  // Extract emails of friends from the data, if available
  const friendEmails = data?.data?.map((friend) => friend.email) || [];

  // Filter users to only show those that are in the friendEmails array
  const filteredUsers = users?.filter((userWrapper) =>
    friendEmails.includes(userWrapper.user?.email)
  );

  return (
    <div className="">
      <div className="grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {filteredUsers?.length > 0 ? (
          filteredUsers.map((userWrapper, index) => {
            const { user } = userWrapper;
            const hasUnreadMessages = !!unreadMessages?.[user.receiverId];

            // Check if the user is online
            const isUserOnline = activeUsers.some(
              (activeUser) => activeUser.userId === user.receiverId
            );

            return (
              <div key={index} className=" px-5 py-5">
                <div className=" h-auto rounded-xl bg-center p-4 border hover:border-primary  w-[180px] shadow-2xl shadow-primary hover:shadow-xl cursor-pointer relative ">
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

                    <h2 className="mt-4 text-[18px] text-white font-bold">
                      {user?.username}
                    </h2>
                    <div className="mt-[25px]">
                      <button
                        className="flex text-[10.8px] items-center justify-center ms-5 pt-[5px] pb-[5px] px-[4px] text-center w-[112px] border text-[#172B4D] hover:text-white hover:bg-[#172B4D] bg-white rounded"
                        onClick={() => handleUserSelect(user)}
                      >
                        <span className="">
                          <BsChatLeftText className="text-[12px] me-2" />
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
            <div className="text-primaryDark h-screen flex justify-center items-center">
              {friendsArray?.length === 0 ? (
                <Loader />
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

export default AvailableUsers;
