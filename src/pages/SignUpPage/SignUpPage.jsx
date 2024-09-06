import SignUpForm from "../../Components/PagesComponents/SignUpPage/SignUpForm";
import SignUpTitle from "../../Components/PagesComponents/SignUpPage/SignUPTitle";

const SignUpPage = () => {
  return (
    <div className="bg-gray-950 h-screen pt-[5rem]">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-[1250px] mx-auto p-2 md:p-0">
        <SignUpTitle />
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
