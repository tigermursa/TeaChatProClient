/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useGetAllThoughtQuery } from "../../../redux/features/thought/thoughtApi";

const Thought = () => {
  const { data } = useGetAllThoughtQuery();
  const thoughts = data?.data || []; // Use optional chaining and default to empty array

  const defaultThought = {
    _id: "default",
    text: "Share your thought now!",
    name: "Team Teachat",
  };

  const allThoughts = [defaultThought, ...thoughts];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % allThoughts.length);
    }, 5000); // time

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [allThoughts.length]);

  return (
    <div className="flex justify-center items-center h-full">
      <div className="relative w-[50%] mx-auto">
        {allThoughts.map((thought, index) => (
          <div
            key={thought._id}
            className={`absolute w-full transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="p-4  rounded-lg text-center">
              <p className="text-white text-xl md:text-2xl font-semibold">
                {thought.text}
              </p>
              <p className="text-gray-300 font-medium text-end ">
                "{thought.name}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Thought;
