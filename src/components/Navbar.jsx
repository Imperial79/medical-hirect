import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

function Navbar() {
  function onNavOpen() {
    let navBar = document.getElementById("navbar-sticky");

    if (navBar.classList.contains("hidden")) {
      navBar.classList.remove("hidden");
    } else {
      navBar.classList.add("hidden");
    }
  }

  return (
    <>
      <nav className="drop-shadow-sm bg-white light:bg-gray-900 fixed w-full z-20 top-0 left-0">
        <div className="w-full flex flex-wrap items-center justify-between p-4">
          <Link to="/" className="flex items-center">
            <img src={logo} className="h-10 mr-3" alt="Flowbite Logo" />

            {/* <span className="self-center text-[20px] font-medium whitespace-nowrap light:text-white text-black">
              MedHire
            </span> */}
          </Link>
          <div className="flex md:order-2">
            <Link
              to="https://recruiter.shapon.tech"
              target="_blank"
              className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2 text-center light:bg-teal-600 light:hover:bg-teal-700 light:focus:ring-teal-800"
            >
              Post Job
            </Link>

            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              onClick={onNavOpen}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 light:text-gray-400 light:hover:bg-gray-700 light:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="md:items-center flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white light:bg-gray-800 md:light:bg-gray-900 light:border-gray-700">
              {/* <li>
                <Link
                  to="#"
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:light:text-blue-500"
                  aria-current="page"
                >
                  Search by Location
                </Link>
              </li> */}

              <li>
                <Link
                  to="#"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:light:hover:text-blue-500 light:text-white light:hover:bg-gray-700 light:hover:text-white md:light:hover:bg-transparent light:border-gray-700"
                >
                  Search by Profession
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs-company"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:light:hover:text-blue-500 light:text-white light:hover:bg-gray-700 light:hover:text-white md:light:hover:bg-transparent light:border-gray-700"
                >
                  Search by Company
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="block py-2 pl-3 pr-4 text-blue-700 rounded font-semibold hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:light:hover:text-blue-500 light:text-white light:hover:bg-gray-700 light:hover:text-white md:light:hover:bg-transparent light:border-gray-700 hover:underline"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav >
    </>
  );
}

export default Navbar;
