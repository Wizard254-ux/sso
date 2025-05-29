import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const SlideFourth = ({ goLeft, goRight, current, OnGetStarted }) => {
  const total = 4;

  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-between min-h-screen bg-white px-4 sm:px-8 lg:px-20 py-10 font-dm-sans relative">
      {/* Text Content */}
      <div className="w-full lg:w-1/2 mt-10 lg:mt-0">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="p-4 sm:p-6 max-w-lg mx-auto lg:mx-0 text-center lg:text-left"
        >
          <h2 className="text-2xl sm:text-3xl text-gray-950 md:text-4xl font-medium mb-4 leading-tight">
            Seamless Collaboration
          </h2>
          <p className="text-gray-600 mb-6 text-sm sm:text-base font-normal leading-snug">
            Work with your team to plan, execute, and{" "}
            <br className="hidden sm:block" />
            succeed together.
          </p>

          <button
            className="bg-[#3683f7] hover:bg-[#2f5aa1] transition w-full sm:w-auto px-6 py-2 rounded-lg text-white mb-6"
            onClick={OnGetStarted}
          >
            <Link to='/CreateOrganization'>
              Get Started
            </Link>
          </button>

          <div className="flex items-center justify-center lg:justify-start gap-4">
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full bg-[#3683f7] text-white hover:bg-[#2f5aa1]"
              onClick={goLeft}
            >
              <ChevronLeft size={18} />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-white ">
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Image Section */}
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-6 lg:mt-0">
        <img
          src="/images/4th.png"
          alt="collaboration"
          className="w-3/4 sm:w-2/3 md:w-[20rem] lg:w-[26rem] max-w-full"
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
    </div>
  );
};

export default SlideFourth;
