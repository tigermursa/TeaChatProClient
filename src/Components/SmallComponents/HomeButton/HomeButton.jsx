/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const MyButton = ({ name, link }) => {
  return (
    <div>
      <Link to={link}>
        <button className="text-gray-200 font-semibold hover:text-gray-300 mt-10 border-[2px] hover:border-primaryDark border-primary p-2 rounded-xl me-5">
          {name}
        </button>
      </Link>
    </div>
  );
};

export default MyButton;
