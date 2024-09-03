/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import useAuth from "../hooks/useAuth";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState({});
  const { currentUser } = useAuth();
  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    // Load unread messages from local storage
    const storedUnreadMessages = JSON.parse(localStorage.getItem('unreadMessages')) || {};
    setUnreadMessages(storedUnreadMessages);

    if (currentUser?.data?._id) {
      const socketInstance = io(BASE_URL);
      setSocket(socketInstance);

      socketInstance.emit("addUser", currentUser.data._id);

      socketInstance.on("getUsers", (users) => {
        setActiveUsers(users);
      });

      socketInstance.on("getMessage", (data) => {
        setUnreadMessages((prev) => {
          const updatedUnreadMessages = {
            ...prev,
            [data.user.id]: true,
          };
          // Save to local storage
          localStorage.setItem('unreadMessages', JSON.stringify(updatedUnreadMessages));
          return updatedUnreadMessages;
        });
      });

      return () => {
        socketInstance.disconnect();
      };
    }
  }, [BASE_URL, currentUser]);

  const markMessageAsRead = (userId) => {
    setUnreadMessages((prev) => {
      const updatedUnreadMessages = {
        ...prev,
        [userId]: false,
      };
      // Save to local storage
      localStorage.setItem('unreadMessages', JSON.stringify(updatedUnreadMessages));
      return updatedUnreadMessages;
    });
  };

  const getUnreadCount = () => {
    if (!currentUser?.data?._id) return 0;
    // Count unread messages only for the current user
    return Object.keys(unreadMessages).filter(userId => unreadMessages[userId] && userId !== currentUser.data._id).length;
  };
  return (
    <SocketContext.Provider
      value={{ socket, activeUsers, unreadMessages, markMessageAsRead , getUnreadCount }}
    >
      {children}
    </SocketContext.Provider>
  );
};
