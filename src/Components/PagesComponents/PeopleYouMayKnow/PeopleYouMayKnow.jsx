import PYMKDesktop from "./PYMKDesktop";
import PYMKMobile from "./PYMKMobile";

const PeopleYouMayKnow = () => {
  return (
    <div>
      <div className="hidden sm:block">
        <PYMKDesktop />
      </div>
      <div className=" block sm:hidden">
        <PYMKMobile />
      </div>
    </div>
  );
};

export default PeopleYouMayKnow;
