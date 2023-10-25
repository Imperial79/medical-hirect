import React from "react";
import { Link } from "react-router-dom";

const Dropdown = () => {
  function onDropdownOpen() {
    let navBar = document.getElementById("dropdown");

    if (navBar.classList.contains("hidden")) {
      navBar.classList.remove("hidden");
      navBar.classList.remove("relative");
    } else {
      navBar.classList.add("hidden");
      navBar.classList.add("relative");
    }
  }

  return (
    <>
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        onClick={onDropdownOpen}
        className="border w-full text-gray-600 bg-white hover:bg-gray-100 font-normal text-sm px-5 py-2.5 text-center inline-flex justify-center items-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800 rounded-full my-1 md:my-0 md:ml-2"
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
        className="absolute z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow md:w-44 w-[100%] light:bg-gray-700"
      >
        <ul
          className="py-2 text-sm text-gray-700 light:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          <li>
            <Link
              to="#"
              className="block px-4 py-2 hover:bg-gray-100 light:hover:bg-gray-600 light:hover:text-white"
            >
              Bangalore, India
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="block px-4 py-2 hover:bg-gray-100 light:hover:bg-gray-600 light:hover:text-white"
            >
              Bangalore, India
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="block px-4 py-2 hover:bg-gray-100 light:hover:bg-gray-600 light:hover:text-white"
            >
              Bangalore, India
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="block px-4 py-2 hover:bg-gray-100 light:hover:bg-gray-600 light:hover:text-white"
            >
              Bangalore, India
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Dropdown;
