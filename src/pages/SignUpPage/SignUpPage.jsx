import SignUpForm from "../../Components/PagesComponents/SignUpPage/SignUpForm";
import SignUpTitle from "../../Components/PagesComponents/SignUpPage/SignUPTitle";

const SignUpPage = () => {
  return (
    <div className="bg-gray-950 min-h-screen flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row md:justify-between items-center max-w-7xl w-full space-y-6 md:space-y-0 md:space-x-10">
        <SignUpTitle />
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
