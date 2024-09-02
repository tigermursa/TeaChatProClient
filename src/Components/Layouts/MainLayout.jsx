import { Outlet } from "react-router-dom";
import ProfileBar from "../SmallComponents/ProfileBar/ProfileBar";

const MainLayout = () => {
  return (
    <div className="bg-primaryDark bg-cover bg-center h-screen ">
      <ProfileBar />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
