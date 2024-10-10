import { Outlet } from "react-router-dom";
import ProfileBar from "../SmallComponents/ProfileBar/ProfileBar";

const MainLayout = () => {
  return (
    <div className="bg-primaryDark bg-cover bg-center absolute w-full">
      <ProfileBar />
      <div className="main-content ">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
