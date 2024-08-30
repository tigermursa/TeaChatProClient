/* eslint-disable react/prop-types */

import TextingPart from "./TextingPart";
import Input from "../Input/Input";
import { IoIosSend } from "react-icons/io";
import { Img } from "react-image";

const ConversationArea = ({
  message,
  messages,
  user,
  messageRef,
  setMessage,
  sendMessage,
  activeUsers, // Pass activeUsers as a prop
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  // Check if the receiver is online by looking for their userId in the activeUsers array
  const isUserOnline = activeUsers.some(
    (activeUser) => activeUser.userId === messages?.receiver?.receiverId
  );
  const receiverImage = messages?.receiver?.userImage;
  return (
    <div className="h-[800px] rounded-2xl flex flex-col items-center">
      {messages?.receiver?.username && (
        <div className="w-full  h-[100px]  flex items-center justify-center border-b rounded-md ">
          <div className="cursor-pointer">
            <Img
              src={receiverImage}
              width={40}
              height={40}
              alt="profile image"
              className="rounded-full ms-10"
            />
          </div>
          <div className="ml-6 mr-auto">
            <h3 className="text-lg font-bold">
              {messages?.receiver?.username}
            </h3>
            <p
              className={`font-bold pb-2 ${
                isUserOnline ? "text-green-600" : "text-gray-600"
              }`}
            >
              {isUserOnline ? "Active now" : "Offline"}
            </p>
          </div>
        </div>
      )}

      <div className="w-full h-full overflow-scroll shadow-sm font-semibold">
        <TextingPart messages={messages} user={user} messageRef={messageRef} />
      </div>
      {messages?.receiver?.username && (
        <div className="w-full flex items-center rounded-2xl p-4 rounded-t-none">
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-[95%]"
            inputClassName="p-4 font-semibold border-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outline-none"
            onKeyDown={handleKeyDown}
          />
          <div
            className={`ml-4 p-2 ${!message && "pointer-events-none"}`}
            onClick={() => sendMessage()}
          >
            <button className="font-semibold flex text-2xl cursor-pointer items-center gap-2 p-3 shadow-md rounded-lg bg-primary text-white">
              <IoIosSend />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationArea;
