import { useState, useEffect } from "react";
import { FaCog, FaUser, FaPen, FaPlus, FaSignOutAlt } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import Error from "../Error/Error";
import Loader from "../Loader/Loader";
import { Img } from "react-image";
import CreateThought from "../../PagesComponents/Thought/CreateThought";
import UpdateThought from "../../PagesComponents/Thought/UpdateThought";
import LogoutSimple from "../LogOut/LogOutSimple";
import { Link } from "react-router-dom";
import FriendRequests from "../Friend/FriendRequests";

const ProfileBar = () => {
  const { currentUser, isLoading, isError } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCreateThoughtOpen, setIsCreateThoughtOpen] = useState(false);
  const [isUpdateThoughtOpen, setIsUpdateThoughtOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentThought, setCurrentThought] = useState(null);
  // console.log(currentUser);
  useEffect(() => {
    if (isCreateThoughtOpen || isUpdateThoughtOpen) {
      setIsModalVisible(true);
    }
  }, [isCreateThoughtOpen, isUpdateThoughtOpen]);

  const closeModalWithAnimation = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      setIsCreateThoughtOpen(false);
      setIsUpdateThoughtOpen(false);
    }, 300); // Delay to match the animation duration
  };

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

  return (
    <>
      <div className="relative flex justify-start gap-6 items-center">
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
                <div className="absolute top-full -right-44 mt-2 bg-gray-800 text-white rounded-lg shadow-lg p-4 w-48">
                  <Link to={"/profile"}>
                    <button className="w-full text-left px-2 py-1 hover:bg-gray-700 rounded flex items-center mb-3">
                      <FaUser className="mr-2" />
                      My Profile
                    </button>
                  </Link>
                  <button
                    onClick={handleCreateThoughtClick}
                    className=" w-full text-left px-2 py-1 hover:bg-gray-700 rounded mt-2 flex items-center mb-3"
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
                    className=" w-full text-left px-2 py-1 hover:bg-gray-700 rounded mt-2 flex items-center mb-3"
                  >
                    <FaPen className="mr-2" />
                    Update Thought
                  </button>
                  <div className="px-2 py-1 rounded flex items-center hover:bg-gray-700 ">
                    <FaSignOutAlt className="mr-2   " />
                    <LogoutSimple />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <FriendRequests  currentUser={currentUser}/>
        </div>
      </div>

      {/* Modals */}

      {/* Create Thought Modal */}
      {isCreateThoughtOpen && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-20 transition-opacity duration-300 ${
            isModalVisible ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeModalWithAnimation}
        >
          <div
            className={`bg-gray-800 bg-opacity-95 p-6 rounded-lg shadow-lg transition-transform duration-300 transform ${
              isModalVisible ? "scale-100" : "scale-90"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <CreateThought onClose={closeModalWithAnimation} />
          </div>
        </div>
      )}

      {/* Update Thought Modal */}
      {isUpdateThoughtOpen && currentThought && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-20 transition-opacity duration-300 ${
            isModalVisible ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeModalWithAnimation}
        >
          <div
            className={`bg-gray-800 bg-opacity-95 p-6 rounded-lg shadow-lg transition-transform duration-300 transform ${
              isModalVisible ? "scale-100" : "scale-90"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <UpdateThought
              thoughtData={currentThought}
              onClose={closeModalWithAnimation}
              user={user}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileBar;
