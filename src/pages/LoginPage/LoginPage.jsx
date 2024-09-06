import LoginForm from "../../Components/PagesComponents/LoginPage/LoginForm";
import LoginTitle from "../../Components/PagesComponents/LoginPage/LoginTitle";

const LoginPage = () => {
  return (
    <div className="bg-gray-950 h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-[850px] mx-auto pt-[10rem]">
        <LoginTitle />
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
