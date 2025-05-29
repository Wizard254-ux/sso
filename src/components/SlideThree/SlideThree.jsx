import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SlideThree = ({ goLeft, goRight, current, OnGetStarted }) => {
  const total = 4;

  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-between min-h-screen bg-white px-4 sm:px-8 lg:px-20 py-10 font-dm-sans relative">
      {/* Text Section */}
      <div className="w-full lg:w-1/2 mt-10 lg:mt-0">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="p-4 sm:p-6 max-w-lg mx-auto lg:mx-0 text-center lg:text-left"
        >
          <h2 className="text-2xl sm:text-3xl text-gray-950 md:text-4xl font-medium mb-4 leading-tight">
            Maximize Your Impact
          </h2>
          <p className="text-gray-600 mb-6 text-sm sm:text-base font-normal leading-snug">
            Optimize your strategies and achieve your
            <br className="hidden sm:block" />
            campaign goals with ease.
          </p>
          <div className="flex items-center justify-center lg:justify-start gap-3 mt-4">
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#3683f7] text-white hover:bg-[#2f5aa1]"
              onClick={goLeft}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#3683f7] text-white hover:bg-[#2f5aa1]"
              onClick={goRight}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Image Section */}
      {/* Image Section */}
      <div className="w-full lg:w-1/2 flex justify-end relative mt-6 lg:mt-0">
        <img
          src="/images/three.png"
          alt="megaphone"
          className="w-3/4 sm:w-2/3 md:w-[20rem] lg:w-[30rem] max-w-none object-contain absolute right-[-1.5rem] sm:right-[-5rem] top-0 lg:top-1/2 lg:translate-y-[-50%]"
        />
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {[...Array(total)].map((_, idx) => (
          <div
            key={idx}
            className={`rounded-full transition-all duration-300 ${current === idx ? "w-6 bg-[#3767b1]" : "w-2 bg-gray-300"
              } h-2`}
          ></div>
        ))}
      </div>

      {/* Skip Button */}
      <div
        className="absolute bottom-5 right-4 sm:right-8 text-[#3767b1] font-medium text-sm sm:text-base cursor-pointer"
        onClick={OnGetStarted}
      >
        <Link to='/CreateOrganization'>
          Skip
        </Link>
      </div>
    </div>
  );
};

export default SlideThree;
