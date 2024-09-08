import SignUpForm from "../../Components/PagesComponents/SignUpPage/SignUpForm";
import SignUpTitle from "../../Components/PagesComponents/SignUpPage/SignUPTitle";

const SignUpPage = () => {
  return (
    <div className="bg-gray-950 h-screen ">
      <div className="flex flex-col md:flex-row md:justify-between items-center h-full max-w-[78rem] mx-auto p-3 md:p-0">
        <SignUpTitle />
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
