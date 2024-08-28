import SignUpForm from "../../Components/PagesComponents/SignUpPage/SignUpForm";
import SignUpTitle from "../../Components/PagesComponents/SignUpPage/SignUPTitle";

const SignUpPage = () => {
  return (
    <div className="flex justify-between items-center max-w-[1250px] mx-auto pt-[10rem]">
      <SignUpTitle />
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
