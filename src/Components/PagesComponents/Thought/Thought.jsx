/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useGetAllThoughtQuery } from "../../../redux/features/thought/thoughtApi";
import styles from "./Thought.module.css";
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
    }, 8000); // time

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [allThoughts.length]);

  return (
    <div className="flex justify-center items-center h-full">
      <div
        className="relative w-[95%] lg:w-[50%] mx-auto"
        style={{ bottom: "15%" }}
      >
        <TransitionGroup>
          {allThoughts.map((thought, index) => (
            <CSSTransition
              key={thought._id}
              timeout={1000}
              classNames={{
                enter: "slide-fade-enter",
                enterActive: "slide-fade-enter-active",
                exit: "slide-fade-exit",
                exitActive: "slide-fade-exit-active",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  transition:
                    "opacity 1s ease-in-out, transform 1s ease-in-out",
                  opacity: index === currentIndex ? 1 : 0,
                  transform:
                    index === currentIndex
                      ? "translateX(0)"
                      : "translateX(100%)",
                }}
              >
                <div className="p-4 rounded-lg text-center">
                  <p
                    className={`${styles["text-shadow-black"]} font-nerko text-4xl md:text-6xl `}
                    style={{
                      color: "white",
                      marginBottom: "1.25rem",
                    }}
                  >
                    {thought.text}
                  </p>
                  <p
                    style={{
                      color: "#D3D3D3",
                      fontWeight: "500",
                      textAlign: "right",
                    }}
                  >
                    "{thought.name}"
                  </p>
                </div>
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  );
};

export default Thought;
