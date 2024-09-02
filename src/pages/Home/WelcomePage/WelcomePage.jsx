import Thought from "../../../Components/PagesComponents/Thought/Thought";
const WelcomePage = () => {
  return (
    <div className="bg-welcome-background bg-cover bg-center h-screen ">
      <div className="overlay h-full">
        <Thought />
      </div>
    </div>
  );
};

export default WelcomePage;
