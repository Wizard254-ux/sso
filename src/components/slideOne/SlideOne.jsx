import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SlideOne = ({ goLeft, goRight, current, OnGetStarted, length }) => {
  const total = 4;

  return (
    <div
      className="flex flex-col-reverse lg:flex-row items-center justify-between min-h-screen bg-white sm:px-8 md:px-12 lg:px-20 font-dm-sans relative"
      style={{
        backgroundImage: "url('/Vector.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center top",
        backgroundSize: "cover",
      }}
    >
      {/* Left Content (Text) */}
      <div className="w-full lg:w-1/2 mt-10 lg:mt-0">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="p-4 sm:p-6 max-w-lg mx-auto lg:mx-0 text-center lg:text-left"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray-950 font-medium mb-4 leading-tight">
            Simplified Campaign Creation
          </h2>
          <p className="text-gray-600 mb-6 text-sm sm:text-base leading-snug font-normal">
            Design powerful campaigns in minutes with our{" "}
            <br className="hidden sm:block" />
            intuitive tools.
          </p>

          {/* Arrows + Mobile Dots */}
          <div className="flex flex-col items-center lg:items-start gap-3 mt-4">
            {/* Arrows */}
            <div className="flex gap-3 mb-2">
              {" "}
              {/* Add margin-bottom */}
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-white">
                <ChevronLeft size={18} />
              </button>
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#3683f7] text-white hover:bg-[#2f5aa1]"
                onClick={goRight}
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Mobile Dots */}
            <div className="flex gap-2 sm:hidden mt-1">
              {" "}
              {/* Add top margin */}
              {[...Array(total)].map((_, idx) => (
                <div
                  key={idx}
                  className={`rounded-full transition-all duration-300 ${current === idx ? "w-6 bg-[#3767b1]" : "w-2 bg-gray-300"
                    } h-2`}
                ></div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-6 lg:mt-0">
        <img
          src="/images/firstSlide.png"
          alt="megaphone"
          className="w-3/4 sm:w-2/3 md:w-[20rem] lg:w-[30rem] lg:mt-24 lg:mr-14 max-w-full"
        />
      </div>

      {/* Desktop Bottom Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden sm:flex gap-2">
        {[...Array(total)].map((_, idx) => (
          <div
            key={idx}
            className={`rounded-full transition-all duration-300 ${current === idx ? "w-6 bg-[#3767b1]" : "w-2 bg-gray-300"
              } h-2`}
          ></div>
        ))}
      </div>

      <div
        className="absolute bottom-5 right-4 sm:right-8 text-[#3767b1] font-medium text-sm sm:text-base cursor-pointer"
        onClick={OnGetStarted}
      >
        <Link to={'/CreateOrganization'}>
          Skip
        </Link>
      </div>
    </div>
  );
};

export default SlideOne;
