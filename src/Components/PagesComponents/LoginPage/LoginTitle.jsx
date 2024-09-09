import { GiCoffeeCup } from "react-icons/gi";

/* eslint-disable react/no-unescaped-entities */
const LoginTitle = () => {
  return (
    <>
      <h3 className="font-bold text-3xl flex justify-center ps-5 items-center gap-1 md:text-4xl text-primary">
        Tea Chat <GiCoffeeCup className="text-yellow-700" />
      </h3>
      <p className="font-semibold mt-2 text-sm text-slate-300 ps-5 pe-5 text-center">
        " Positive online interactions can boost mental well-being "
      </p>
    </>
  );
};

export default LoginTitle;
