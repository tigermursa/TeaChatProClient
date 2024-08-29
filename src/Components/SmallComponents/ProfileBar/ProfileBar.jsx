// components/ProfileBar/ProfileBar.js
import { useState } from "react";
import { FaCog, FaUser, FaPen, FaPlus, FaSignOutAlt } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import Error from "../Error/Error";
import Loader from "../Loader/Loader";
import { Img } from "react-image";
import LogoutButton from "../LogOut/LogOut";
import CreateThought from "../../PagesComponents/Thought/CreateThought";
import UpdateThought from "../../PagesComponents/Thought/UpdateThought";
import LogoutSimple from "../LogOut/LogOutSimple";

const ProfileBar = () => {
  const { currentUser, isLoading, isError } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCreateThoughtOpen, setIsCreateThoughtOpen] = useState(false);
  const [isUpdateThoughtOpen, setIsUpdateThoughtOpen] = useState(false);
  const [currentThought, setCurrentThought] = useState(null);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <Error />
      </div>
    );
  }

  const user = currentUser.data;

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCreateThoughtClick = () => {
    setIsCreateThoughtOpen(true);
    setIsMenuOpen(false);
  };

  const handleUpdateThoughtClick = (thought) => {
    setCurrentThought(thought);
    setIsUpdateThoughtOpen(true);
    setIsMenuOpen(false);
  };

  const handleCloseModal = () => {
    setIsCreateThoughtOpen(false);
    setIsUpdateThoughtOpen(false);
  };

  return (
    <>
      <div className="relative flex justify-between items-center">
        <div className="flex items-center gap-2 pt-5 ps-2">
          <Img
            src={user?.userImage}
            className="w-[80px] h-[80px] object-cover rounded-full border-[4px] border-primary"
            alt="user profile"
          />
          <div className="text-gray-200 font-semibold flex items-center gap-2">
            <div>
              <p className="text-lg md:text-2xl">{user?.username}</p>
              <p className="text-sm md:text-lg">{user?.work}</p>
            </div>
            <div className="relative">
              <FaCog
                onClick={handleMenuToggle}
                className="text-gray-200 cursor-pointer animate-spin"
                size={24}
              />
              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute top-full right-0 mt-2 bg-gray-800 text-white rounded-lg shadow-lg p-4 w-48">
                  <button
                    onClick={() =>
                      (window.location.href = `/profile/${user?._id}`)
                    }
                    className="w-full text-left px-2 py-1 hover:bg-gray-700 rounded flex items-center"
                  >
                    <FaUser className="mr-2" />
                    Visit Profile
                  </button>
                  <button
                    onClick={handleCreateThoughtClick}
                    className=" w-full text-left px-2 py-1 hover:bg-gray-700 rounded mt-2 flex items-center"
                  >
                    <FaPlus className="mr-2" />
                    Create Thought
                  </button>

                  <button
                    onClick={() =>
                      handleUpdateThoughtClick({
                        id: "exampleId",
                        text: "Current thought text",
                      })
                    }
                    className=" w-full text-left px-2 py-1 hover:bg-gray-700 rounded mt-2 flex items-center"
                  >
                    <FaPen className="mr-2" />
                    Update Thought
                  </button>
                  <div className="px-2 py-1 rounded flex items-center">
                    <FaSignOutAlt className="mr-2 hover:bg-gray-700  " />
                    <LogoutSimple />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <LogoutButton />
        </div>
      </div>

      {/* Create Thought Modal */}
      {isCreateThoughtOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-20"
          onClick={handleCloseModal}
        >
          <div
            className="bg-gray-800 bg-opacity-95 p-6 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <CreateThought onClose={handleCloseModal} />
          </div>
        </div>
      )}

      {/* Update Thought Modal */}
      {isUpdateThoughtOpen && currentThought && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-20"
          onClick={handleCloseModal}
        >
          <div
            className="bg-gray-800 bg-opacity-95 p-6 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <UpdateThought
              thoughtData={currentThought}
              onClose={handleCloseModal}
              user={user}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileBar;
