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
    if (currentUser?.data?._id) {
      const socketInstance = io(BASE_URL);
      setSocket(socketInstance);

      socketInstance.emit("addUser", currentUser.data._id);

      // Handle receiving the updated active users list
      socketInstance.on("getUsers", (users) => {
        setActiveUsers(users);
      });

      // Handle receiving a new message
      socketInstance.on("getMessage", (data) => {
        setUnreadMessages((prev) => ({
          ...prev,
          [data.user.id]: true,
        }));
      });

      return () => {
        socketInstance.disconnect();
      };
    }
  }, [BASE_URL, currentUser]);

  const markMessageAsRead = (userId) => {
    setUnreadMessages((prev) => ({
      ...prev,
      [userId]: false,
    }));
  };

  return (
    <SocketContext.Provider
      value={{ socket, activeUsers, unreadMessages, markMessageAsRead }}
    >
      {children}
    </SocketContext.Provider>
  );
};
