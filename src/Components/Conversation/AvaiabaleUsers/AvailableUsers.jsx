import AvailableUsersMobile from "./AvailableUsersMobile";
import AvailableUsersDesktop from "./AvaliableUsersDesktop";

const AvailableUsers = () => {
  return (
    <div>
      <div className="hidden sm:block">
        <AvailableUsersDesktop />
      </div>
      <div className=" block sm:hidden">
        <AvailableUsersMobile />
      </div>
    </div>
  );
};

export default AvailableUsers;
