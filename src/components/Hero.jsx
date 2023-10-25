import Dropdown from "./Dropdown";
import React from "react";
import { Link } from "react-router-dom";

function Hero(props) {
  return (
    <>
      <div className="bg-[#6390df] px-5 pt-20">
        <h1 className="mt-10 md:text-[30px] text-[30px] text-center font-semibold md:font-medium text-white">
          {props.title}
        </h1>

        <h1 className="md:mt-0 mt-2 mb-4 md:text-[17px] text-[15px] font-sans text-white text-center">
          {props.subtitle}
        </h1>

        <div className="border-b-[1px] mt-10 bg-white rounded-tl-lg rounded-tr-lg p-10 md:w-[70%] w-[90%] mx-auto">
          <div className="flex flex-wrap sm:flex-nowrap">
            <div className="w-full sm:w-1/2">
              <input
                type="text"
                id="base-input"
                className="bg-white border border-gray-200 text-gray-900 text-sm rounded-full block w-full p-2.5 light:bg-gray-700 light:placeholder-gray-400 light:text-white"
                placeholder="Search job titles, keywords, skills etc"
              />
            </div>

            <div className="w-full sm:w-1/4">
              <Dropdown />
            </div>
            <div className="w-full sm:w-1/5">
              <Link to="/login">
                <button
                  type="button"
                  className="w-full focus:outline-none text-center text-white bg-[#dc832d] hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 mb-2 md:ml-4 light:focus:ring-yellow-900"
                >
                  {props.buttonLabel}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hero;
