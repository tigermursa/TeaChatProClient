/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import useAuth from "../hooks/useAuth";
import mp3 from "../assets/Sounds/notification-two.mp3";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { toast } from "react-toastify";
const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState({});
  const { currentUser } = useAuth();
  const [friendRequestCount, setFriendRequestCount] = useState(0);
  // const BASE_URL = "https://teachat-server.onrender.com";
  // const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    // Load unread messages and friend request count from localStorage
    const storedUnreadMessages =
      JSON.parse(localStorage.getItem("unreadMessages")) || {};
    setUnreadMessages(storedUnreadMessages);

    const storedFriendRequestCount = localStorage.getItem("friendRequestCount");
    if (storedFriendRequestCount) {
      setFriendRequestCount(parseInt(storedFriendRequestCount, 10));
    }

    if (currentUser?.data?._id) {
      const socketInstance = io(BASE_URL);
      setSocket(socketInstance);

      socketInstance.emit("addUser", currentUser.data._id);

      socketInstance.on("getUsers", (users) => {
        setActiveUsers(users);
      });

      socketInstance.on("getMessage", (data) => {
        // Play the notification sound
        const audio = new Audio(mp3);
        audio.play().catch((error) => {
          console.error("Failed to play notification sound:", error);
        });

        setUnreadMessages((prev) => {
          const updatedUnreadMessages = {
            ...prev,
            [data.user.id]: true,
          };
          // Save to local storage
          localStorage.setItem(
            "unreadMessages",
            JSON.stringify(updatedUnreadMessages)
          );
          return updatedUnreadMessages;
        });
      });

      // Handle friend request notifications
      socketInstance.on("friendRequest", ({ senderUsername }) => {
        // Play the notification sound
        toast.info(`New friend request from ${senderUsername}`);

        // Update friend request count in real-time and store it in localStorage
        setFriendRequestCount((prevCount) => {
          const newCount = prevCount + 1;
          localStorage.setItem("friendRequestCount", newCount); // Store count
          return newCount;
        });
      });

      return () => {
        socketInstance.disconnect();
      };
    }
  }, [BASE_URL, currentUser]);

  useEffect(() => {
    // Store friend request count in localStorage on change
    localStorage.setItem("friendRequestCount", friendRequestCount);
  }, [friendRequestCount]);

  const markMessageAsRead = (userId) => {
    setUnreadMessages((prev) => {
      const updatedUnreadMessages = {
        ...prev,
        [userId]: false,
      };
      // Save to local storage
      localStorage.setItem(
        "unreadMessages",
        JSON.stringify(updatedUnreadMessages)
      );
      return updatedUnreadMessages;
    });
  };

  const getUnreadCount = () => {
    if (!currentUser?.data?._id) return 0;
    // Count unread messages only for the current user
    return Object.keys(unreadMessages).filter(
      (userId) => unreadMessages[userId] && userId !== currentUser.data._id
    ).length;
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        activeUsers,
        unreadMessages,
        markMessageAsRead,
        getUnreadCount,
        friendRequestCount,
        setFriendRequestCount,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
