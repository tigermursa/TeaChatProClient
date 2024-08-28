import LoginForm from "../../Components/PagesComponents/LoginPage/LoginForm";
import LoginTitle from "../../Components/PagesComponents/LoginPage/LoginTitle";

const LoginPage = () => {
  return (
    <div className="flex justify-between items-center max-w-[850px] mx-auto pt-[10rem]">
      <LoginTitle />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
