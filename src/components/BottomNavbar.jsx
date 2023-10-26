import React from "react";
import resume from "../assets/resume.svg";
import profile from "../assets/profile.svg";
import { Link } from "react-router-dom";

function BottomNavbar(props) {
  return (
    <div className="block md:hidden">
      <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 light:bg-gray-700 light:border-gray-600">
        <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
          <Link
            to="/dashboard/profile"
            type="button"
            className={`inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 light:hover:bg-gray-800 group ${
              props.activeButton === 2 ? "bg-blue-100" : ""
            }`}
          >
            <img src={profile} alt="" className="h-5 mb-2" />
            <span className="  text-sm text-gray-500 light:text-gray-400">
              Profile
            </span>
          </Link>

          <Link
            to="/dashboard/applied-jobs"
            type="button"
            className={`inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 light:hover:bg-gray-800 group ${
              props.activeButton === 1 ? "bg-blue-100" : ""
            }`}
          >
            <img src={resume} alt="" className="h-5 mb-2" />
            <span className="  text-sm text-gray-500 light:text-gray-400">
              Applied Jobs
            </span>
          </Link>
          <Link
            to="/dashboard/resumes"
            type="button"
            className={`inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 light:hover:bg-gray-800 group ${
              props.activeButton === 0 ? "bg-blue-100" : ""
            }`}
          >
            <img src={resume} alt="" className="h-5 mb-2" />
            <span className="  text-sm text-gray-500 light:text-gray-400">
              Resumes
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BottomNavbar;
