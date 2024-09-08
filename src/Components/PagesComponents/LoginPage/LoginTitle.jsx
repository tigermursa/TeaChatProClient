import { GiCoffeeCup } from "react-icons/gi";

/* eslint-disable react/no-unescaped-entities */
const LoginTitle = () => {
  return (
    <div className="">
      <h3 className="font-bold text-2xl flex items-center gap-1 md:text-4xl text-primary">
        Tea Chat <GiCoffeeCup className="text-yellow-700" />
      </h3>
      <p className="font-semibold mt-2 text-sm text-slate-300">
        "Connects people and fosters sharing"
      </p>
    </div>
  );
};

export default LoginTitle;
