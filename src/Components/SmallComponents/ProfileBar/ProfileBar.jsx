import useAuth from "../../../hooks/useAuth";
import Error from "../Error/Error";
import Loader from "../Loader/Loader";
import { Img } from "react-image";
import LogoutButton from "../LogOut/LogOut";
const ProfileBar = () => {
  const { currentUser, isLoading, isError } = useAuth();

  console.log(currentUser);

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

  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-center gap-2 pt-5 ps-2 ">
          <Img
            src={user?.userImage}
            className="w-[80px] h-[80px] object-cover rounded-full border-[4px] border-primary"
            alt="user profile "
            loader={
              <div>
                <Loader />
              </div>
            }
          />
          <div className="text-gray-200 font-semibold">
            <p className="text-lg md:text-2xl">{user?.username}</p>
            <p className="text-sm  md:text-lg">{user?.work}</p>
          </div>
        </div>
        <div>
          <LogoutButton />
        </div>
      </div>
    </>
  );
};

export default ProfileBar;
