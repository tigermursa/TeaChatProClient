import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import PeopleYouMayKnow from "../PeopleYouMayKnow/PeopleYouMayKnow";
import { motion, AnimatePresence } from "framer-motion";

const FindFriends = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <FaSearch
        className="text-2xl text-white cursor-pointer relative"
        onClick={handleOpen}
      />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center  z-50"
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
              <h2 className="text-2xl mb-4">People You May Know</h2>
              <PeopleYouMayKnow />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FindFriends;
