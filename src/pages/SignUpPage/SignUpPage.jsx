import SignUpForm from "../../Components/PagesComponents/SignUpPage/SignUpForm";
import SignUpTitle from "../../Components/PagesComponents/SignUpPage/SignUPTitle";

const SignUpPage = () => {
  return (
    <div className="bg-gray-950 h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-[1250px] mx-auto ">
        <SignUpTitle />
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
