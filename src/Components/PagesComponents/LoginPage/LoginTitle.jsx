import { GiCoffeeCup } from "react-icons/gi";

/* eslint-disable react/no-unescaped-entities */
const LoginTitle = () => {
  return (
    <div className="">
      <h3 className="font-bold text-2xl flex items-center gap-1 md:text-4xl text-primary text-center mx-auto justify-center">
        Tea Chat <GiCoffeeCup className="text-yellow-700" />
      </h3>
      <p className="font-semibold font-mono mt-2 text-sm text-slate-300 text-center">
        "Positive online interactions can boost mental well-being"
      </p>
    </div>
  );
};

export default LoginTitle;
