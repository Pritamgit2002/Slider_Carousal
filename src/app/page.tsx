"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "tailwindcss/tailwind.css";
import Card from "./Card";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface DataItem {
  img: string;
  title: string;
  desc: string;
  sub: string;
}

const data: DataItem[] = [
  {
    img: "",
    title: "Demo Intern",
    desc: "Experience with Python Data Analysis Packages is a must",
    sub: "Past internships in Data Science or Machine Learning",
  },
  {
    img: "",
    title: "Demo Engineer",
    desc: "Experience with Python Data Analysis Packages is a must",
    sub: "Past internships in Data Science or Machine Learning",
  },
  {
    img: "",
    title: "Half Stack Engineer",
    desc: "Experience with Python Data Analysis Packages is a must",
    sub: "Past internships in Data Science or Machine Learning",
  },
  {
    img: "",
    title: "Weekend Engineer",
    desc: "Experience with Python Data Analysis Packages is a must",
    sub: "Past internships in Data Science or Machine Learning",
  },
  {
    img: "",
    title: "Bot Engineer",
    desc: "Experience with Python Data Analysis Packages is a must",
    sub: "Past internships in Data Science or Machine Learning",
  },
];
export default function Home() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [xValue, setXValue] = useState<number>(850);

  useEffect(() => {
    const updateXValue = () => {
      if (typeof window !== "undefined") {
        const computedXValue = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--x-value"
          )
        );
        setXValue(computedXValue || 850);
      }
    };

    updateXValue();
    window.addEventListener("resize", updateXValue);
    return () => window.removeEventListener("resize", updateXValue);
  }, []);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      goToNext();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const prevIndex = (currentIndex - 1 + data.length) % data.length;
  const nextIndex = (currentIndex + 1) % data.length;

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex(prevIndex);
    setIsAutoPlay(false); // stop auto play on manual navigation
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex(nextIndex);
    setIsAutoPlay(false); // stop auto play on manual navigation
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? xValue : -xValue,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? xValue : -xValue,
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full flex items-start sm:items-center justify-center h-[475px] sm:h-screen overflow-hidden bg-slate-400 my-auto ">
      <div className="absolute w-[315px] sm:w-[475px] md:w-[500px] lg:w-[700px] xl:w-[750px] 2xl:w-[800px] flex items-center justify-between bottom-0 sm:bottom-auto z-20 sm:z-0  ">
        <button
          className="rounded-full cursor-pointer p-3 md:p-4 text-2xl sm:text-xl text-white border-2 border-white bg-[#4A5FF6] z-20 sm:z-0"
          onClick={goToPrev}
        >
          <FaChevronLeft />
        </button>
        <button
          className="rounded-full cursor-pointer p-3 md:p-4 text-2xl sm:text-xl text-white border-2 border-white bg-[#4A5FF6] z-20 sm:z-0"
          onClick={goToNext}
        >
          <FaChevronRight />
        </button>
      </div>
      <div className="absolute left-0 sm:left-20 lg:left-36 xl:left-52 2xl:left-96 transform -translate-x-full transition-transform duration-500">
        <motion.div
          key={prevIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 250, damping: 20 },
            opacity: { duration: 0.1 },
          }}
          className="text-white rounded-lg shadow-lg"
        >
          <Card
            imgUrl={data[prevIndex].img}
            title={data[prevIndex].title}
            description={data[prevIndex].desc}
          />
        </motion.div>
      </div>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 250, damping: 20 },
            opacity: { duration: 0.1 },
          }}
          className="absolute text-white rounded-lg shadow-lg"
        >
          <Card
            imgUrl={data[currentIndex].img}
            title={data[currentIndex].title}
            description={data[currentIndex].desc}
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute right-0 sm:right-20 lg:right-36 xl:right-52 2xl:right-96 transform translate-x-full transition-transform duration-500">
        <motion.div
          key={nextIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 250, damping: 20 },
            opacity: { duration: 0.1 },
          }}
          className="text-white rounded-lg shadow-lg"
        >
          <Card
            imgUrl={data[nextIndex].img}
            title={data[nextIndex].title}
            description={data[nextIndex].desc}
          />
        </motion.div>
      </div>
    </div>
  );
}
