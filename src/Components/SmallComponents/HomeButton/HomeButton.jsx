import { Link } from "react-router-dom";

const HomeButton = () => {
  return (
    <div>
      <Link to={"/"}>
        <button className="text-gray-200 font-semibold hover:text-gray-300 mt-10 border-[2px] hover:border-primaryDark border-primary p-2 rounded-xl me-5">
          Home
        </button>
      </Link>
    </div>
  );
};

export default HomeButton;
