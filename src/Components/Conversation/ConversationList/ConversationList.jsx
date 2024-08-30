/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

const ConversationList = ({ user, conversations, fetchMessages }) => {
  return (
    <div>
      <div className="h-screen bg-secondary  overflow-scroll bg-gradient-to-t from-primary to-red-500">
        {/* current user area */}
        <div className="flex items-center my-4 mx-14 bg-blue-600  rounded-xl border  ">
          <div>
            <img
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJmNZo9wLt4zSz-u9vt4wP2HxNE9_5z5j2YKyOWuMrKyMnfqo9Wagr422Mq6_7c_dfAig&usqp=CAU"
              }
              width={75}
              height={75}
              className="border border-primary p-[2px] object-fill rounded-full"
            />
          </div>
          <div className="ml-8">
            <h3 className="text-2xl text-white">{user?.fullName}</h3>
          </div>
        </div>
        <hr />
        <div className="mx-14 mt-10 ">
          <div className="text-white text-lg font-semibold">
            Conversations ({conversations.length})
          </div>
          <div>
            {conversations.length > 0 ? (
              conversations?.map(({ conversationId, user, index }) => {
                return (
                  <div
                    key={index}
                    className="flex items-center py-8 border-b border-b-gray-300"
                  >
                    <div
                      className="cursor-pointer flex items-center"
                      onClick={() => fetchMessages(conversationId, user)}
                    >
                      <div>
                        <img
                          src={"https://xetaravel.com/images/avatar.png"}
                          className="w-[60px] h-[60px] rounded-full p-[2px] border border-primary"
                        />
                      </div>
                      <div className="ml-6">
                        <h3 className="text-lg font-semibold text-white">
                          {user?.fullName}
                        </h3>
                        <p className="text-sm font-light text-gray-200">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-lg font-semibold mt-24">
                No Conversations
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationList;
