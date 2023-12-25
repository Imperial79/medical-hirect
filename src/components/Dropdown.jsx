import React, { useState } from "react";

const Dropdown = ({ dataList }) => {
  const [isDropOpen, setisDropOpen] = useState(false);

  function toggleDropdown() {
    setisDropOpen(!isDropOpen);
  }

  return (
    <>
      <div>
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          onClick={toggleDropdown}
          className="border w-full text-gray-600 bg-white hover:bg-gray-100 font-normal text-sm px-5 py-2.5 text-center inline-flex justify-between items-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800 rounded-full my-1 md:my-0 md:ml-2"
          type="button"
        >
          Location
          <svg
            className="w-2.5 h-2.5 ml-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        <div
          id="dropdown"
          className={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow md:w-56 w-[65%] max-h-[300px] overflow-y-auto ${
            isDropOpen ? "absolute" : "hidden"
          }`}
        >
          <ul
            className="py-2 text-sm text-gray-700 light:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            {dataList.map((data, index) => (
              <li key={index}>
                <button
                  type="button"
                  className="w-full text-start block px-4 py-2 hover:bg-gray-100 light:hover:bg-gray-600 light:hover:text-white"
                >
                  {data.stateName + ", " + data.abbr}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dropdown;
