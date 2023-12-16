import React from "react";

function Hero(props) {
  return (
    <div className="bg-blue-500 px-5 pt-20 min-w-full">
      <h1 className="mt-10 md:text-[30px] text-[30px] text-center font-semibold md:font-medium text-white">
        {props.title}
      </h1>

      <h1 className="md:mt-0 mt-2 mb-4 md:text-[17px] text-[15px] font-sans text-white text-center">
        {props.subtitle}
      </h1>

      <div className="border-b-[1px] mt-10 bg-white rounded-tl-lg rounded-tr-lg p-10 md:w-[70%] w-[90%] mx-auto">
        {props.children}
      </div>
    </div>
  );
}

export default Hero;
