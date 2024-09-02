/* eslint-disable react/prop-types */
import { format } from "date-fns";
import Loader from "../../SmallComponents/Loader/Loader";

const TextingPart = ({ messages, user, messageRef }) => {
  // Check if there are no messages and a user is selected
  const noMessages =
    !messages?.messages?.length && messages?.receiver?.username;
  //console.log(messages)
  return (
    <div className="p-14">
      {noMessages ? (
        <div className="text-center text-lg font-bold mt-24 text-gray-500">
          <p>No messages yet. Start the conversation!</p>
        </div>
      ) : messages?.messages?.length > 0 ? (
        messages.messages.map(
          ({ message, user: { id } = {}, createdAt }, index) => {
            const isLastMessage = index === messages.messages.length - 1;

            // Format the createdAt date to a readable time format
            const formattedTime = createdAt
              ? format(new Date(createdAt), "p")
              : "";

            return (
              <div key={index} className="flex">
                <div
                  className={`max-w-[70%] md:max-w-[40%] text-wrap rounded-lg p-4 mb-4 shadow-sm ${
                    id === user?.id
                      ? "bg-blue-700 text-white ml-auto"
                      : "bg-primary text-white"
                  }`}
                >
                  <p className="font-medium text-base">{message}</p>
                  {formattedTime && (
                    <p className="text-[8px] text-gray-200 mt-2  text-right">
                      {formattedTime}
                    </p>
                  )}
                </div>
                {isLastMessage && <div ref={messageRef}></div>}
              </div>
            );
          }
        )
      ) : (
        <div className=" flex justify-center items-center h-[400px] w-auto">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default TextingPart;
