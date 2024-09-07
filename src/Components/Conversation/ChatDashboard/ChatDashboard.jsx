/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { useSocket } from "../../../Providers/SocketProvider";
import useAuth from "../../../hooks/useAuth";
import ConversationArea from "../ConversationArea/ConversationArea";
import "./ChatDashboard.css";
import AvailableUsers from "../AvaiabaleUsers/AvailableUsers";

const ChatDashboard = () => {
  const { currentUser } = useAuth();
  const { socket, activeUsers } = useSocket();
  const user = {
    id: currentUser?.data?._id,
    username: currentUser?.data?.username,
    email: currentUser?.data?.email,
  };

  const friendsArray = currentUser?.data?.friends || [];
  const BASE_URL = "https://teachat-server.onrender.com";

  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({});
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const messageRef = useRef(null);

  // Fetch and set active users when the socket connects
  useEffect(() => {
    if (socket && user?.id) {
      const handleGetUsers = (users) => {
        console.log("Active users received:", users);
      };

      const handleGetMessage = (data) => {
        const newMessage = {
          user: data.user,
          message: data.message,
          createdAt: data.createdAt || new Date().toISOString(),
        };

        setMessages((prev) => ({
          ...prev,
          messages: prev.messages
            ? [...prev.messages, newMessage]
            : [newMessage],
        }));
      };

      socket.on("getUsers", handleGetUsers);
      socket.on("getMessage", handleGetMessage);

      // Request the active users list when component mounts
      socket.emit("requestUsers");

      return () => {
        socket.off("getUsers", handleGetUsers);
        socket.off("getMessage", handleGetMessage);
      };
    }
  }, [socket, user?.id, selectedUser]);

  // Scroll to the latest message when messages update
  useEffect(() => {
    messageRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages?.messages]);

  // Fetch conversations for the logged-in user
  useEffect(() => {
    if (!user?.id) return;

    const fetchConversations = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/conversations/${user.id}`);
        const resData = await res.json();
        setConversations(resData);
      } catch (error) {
        console.error("Failed to fetch conversations", error);
      }
    };
    fetchConversations();
  }, [user?.id]);

  // Fetch all users except the logged-in user
  useEffect(() => {
    if (!user?.id) return;

    const fetchUsers = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/users/${user?.id}`);
        const resData = await res.json();
        setUsers(resData);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    };
    fetchUsers();
  }, [user?.id]);

  // Fetch messages for the selected conversation and user
  const fetchMessages = async (conversationId, receiver) => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/message/${conversationId}?senderId=${user?.id}&receiverId=${receiver?.receiverId}`
      );
      const resData = await res.json();
      setMessages({ messages: resData, receiver, conversationId });
    } catch (error) {
      console.error("Failed to fetch messages", error);
    }
  };

  // Send a message via socket and API
  const sendMessage = async () => {
    if (!message.trim()) return;

    const timestamp = new Date().toISOString();

    socket?.emit("sendMessage", {
      senderId: user?.id,
      receiverId: messages?.receiver?.receiverId,
      message,
      conversationId: messages?.conversationId,
      createdAt: timestamp,
    });

    setMessage("");

    try {
      await fetch(`${BASE_URL}/api/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversationId: messages?.conversationId,
          senderId: user?.id,
          message,
          receiverId: messages?.receiver?.receiverId,
          createdAt: timestamp,
        }),
      });
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setMessages({});
    setIsModalOpen(true);
    fetchMessages("new", user);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="bg-chat-background bg-cover h-screen overflow-y-scroll">
      <div className="overlay h-screen">
        <div className="">
          <AvailableUsers
            friendsArray={friendsArray}
            users={users}
            handleUserSelect={handleUserSelect}
            activeUsers={activeUsers}
          />
        </div>
      </div>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex justify-center items-center z-[200]"
        >
          <div className="bg-white rounded-md shadow-lg w-[90%] md:w-[70%] lg:w-[50%]">
            <div className="flex justify-end items-center rounded-t-lg pt-2 pe-2 ">
              <button
                onClick={handleCloseModal}
                className="text-gray-700 font-semibold"
              >
                <IoClose className="bg-primary hover:rotate-180 transition rounded-full text-[1.5rem] text-white" />
              </button>
            </div>
            <ConversationArea
              message={message}
              messages={messages}
              user={user}
              users={users}
              setMessage={setMessage}
              sendMessage={sendMessage}
              messageRef={messageRef}
              activeUsers={activeUsers}
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ChatDashboard;
