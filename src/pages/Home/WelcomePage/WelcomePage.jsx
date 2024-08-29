import ProfileBar from "../../../Components/SmallComponents/ProfileBar/ProfileBar";

const WelcomePage = () => {
  return (
    <div className="bg-welcome-background bg-cover bg-center h-screen ">
      <div className="overlay h-screen">
        <ProfileBar />
      </div>
    </div>
  );
};

export default WelcomePage;
