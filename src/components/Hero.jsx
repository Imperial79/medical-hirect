import React from "react";

function Hero(props) {
  return (
    <div className="bg-blue-500 pt-20 min-w-full">
      <h1 className="mt-10 md:text-[30px] text-[25px] text-center font-semibold md:font-medium text-white">
        {props.title}
      </h1>

      <h1 className="px-5 md:mt-0 mt-2 mb-4 md:text-[17px] text-[15px] font-sans text-white text-center">
        {props.subtitle}
      </h1>

      <div className="mt-10 bg-gray-50 rounded-tl-lg rounded-tr-lg pt-10 md:px-10 px-[25px] pb-5 md:max-w-[1000px] mx-5 md:mx-auto drop-shadow-xl">
        {props.children}
      </div>
    </div>
  );
}

export default Hero;
