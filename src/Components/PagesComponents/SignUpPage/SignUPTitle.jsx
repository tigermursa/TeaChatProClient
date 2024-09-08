/* eslint-disable react/no-unescaped-entities */
import { GiCoffeeCup } from "react-icons/gi";

const SignUpTitle = () => {
  return (
    <div className="text-center md:text-left">
      <h3 className="font-bold text-2xl md:text-4xl flex justify-center md:justify-start items-center gap-2 text-primary">
        Tea Chat <GiCoffeeCup className="text-yellow-700" />
      </h3>
      <p className="font-semibold mt-2 text-sm md:text-base text-slate-300">
        "Teachat facilitates connections and encourages sharing"
      </p>
    </div>
  );
};

export default SignUpTitle;
