/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  //base url
  const BASE_URL = "http://localhost:5000";
  useEffect(() => {
    const socketInstance = io(BASE_URL);
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [BASE_URL]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
