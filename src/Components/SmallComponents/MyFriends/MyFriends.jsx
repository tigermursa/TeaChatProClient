/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { FaUserFriends, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Img } from "react-image";
import { useGetUserByIDArrayQuery } from "../../../redux/features/friend/friendApi";

const MyFriends = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);

  // Fetch friends only when shouldFetch is true (i.e., when the modal is opened)
  const MyFriendsArray = currentUser?.data?.friends || [];
  const { data, error, isLoading } = useGetUserByIDArrayQuery(MyFriendsArray, {
    skip: !shouldFetch,
  });

  const handleOpen = () => {
    setShouldFetch(true); // Trigger the fetching of friends
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      setShouldFetch(false); // Stop fetching when the modal is closed
    }
  }, [isOpen]);

  return (
    <div className="relative">
      <FaUserFriends
        className="text-2xl text-white cursor-pointer"
        onClick={handleOpen}
      />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
          >
            <motion.div
              className="bg-gray-800 text-white p-6 rounded-lg shadow-lg relative w-full max-w-3xl"
              initial={{ y: "-100vh" }}
              animate={{ y: 0 }}
              exit={{ y: "100vh" }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 15,
              }}
            >
              <button
                className="absolute top-4 right-4 text-white"
                onClick={handleClose}
              >
                <FaTimes size={20} />
              </button>
              <h2 className="text-2xl mb-4">My Friends</h2>
              
              {/* Loading and Error States */}
              {isLoading && <p>Loading...</p>}
              {error && <p>Error loading friends</p>}
              
              {/* Display Friends Data */}
              {data && data?.data?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {data.data.map((friend) => (
                    <div
                      key={friend._id}
                      className="bg-gray-800 bg-opacity-60 border border-primary rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105"
                    >
                      <Img
                        src={friend?.userImage}
                        alt={friend?.username}
                        className="w-full h-40 object-cover rounded-t-lg"
                      />
                      <div className="p-4 flex flex-col items-center">
                        <h3 className="text-lg font-semibold text-gray-200">
                          {friend?.username}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                !isLoading && <p>No friends to display</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyFriends;
