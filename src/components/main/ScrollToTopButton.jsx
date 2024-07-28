import { useEffect, useState } from "react";
import ArrowUp from "../other/ArrowUp";

const ScrollToTopButton = () => {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const scrollCallback = () => {
      const scrolledFromTop = window.scrollY;
      setShown(() => scrolledFromTop > 300);
    };

    window.addEventListener("scroll", scrollCallback);

    scrollCallback();

    return () => {
      window.removeEventListener("scroll", scrollCallback);
    };
  }, []);

  return (
    <button
      aria-label="scroll to top"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className={`${
        shown ? "scale-100" : "scale-0"
      } w-12 h-12 transition-transform fixed right-10 bottom-10 bg-stone-100 rounded-md shadow-lg shadow-gray-900 justify-center items-center`}
    >
      <ArrowUp />
    </button>
  );
};

export default ScrollToTopButton;
