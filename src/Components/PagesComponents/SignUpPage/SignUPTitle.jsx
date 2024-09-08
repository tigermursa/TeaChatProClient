/* eslint-disable react/no-unescaped-entities */
import { GiCoffeeCup } from "react-icons/gi";
const SignUpTitle = () => {
  return (
    <div className="ps-5 md:ps-0 ">
      <h3 className="font-bold text-2xl flex items-center gap-1 md:text-4xl text-primary">
        Tea Chat <GiCoffeeCup className="text-yellow-700"/>
      </h3>
      <p className="font-semibold mt-2 text-sm text-slate-300">
        "Teachat facilitates connections and encourages sharing"
      </p>
    </div>
  );
};

export default SignUpTitle;
