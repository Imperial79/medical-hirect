import React, { useState } from "react";
import resume from "../assets/resume.svg";
import profile from "../assets/profile.svg";
import job from "../assets/job.svg";
import { Link } from "react-router-dom";

const Sidebar = (props) => {
  return (
    <div className="md:block hidden">
      <div className="ml-[10px] m-5 bg-white text-white w-20 top-0 left-0 py-4 px-2 flex-col items-center justify-center">
        <Link to="/dashboard/profile" className="mb-7">
          <button
            className={`my-5 font-medium text-black h-10 w-10 rounded-full text-center text-sm hover:text-blue-500 ${
              props.activeButton === 2 ? "bg-blue-200" : "bg-gray-100"
            }`}
          >
            <img src={profile} alt="Profile" className="h-[20px] mx-auto" />
          </button>
        </Link>
        <Link to="/dashboard/applied-jobs" className="mb-7">
          <button
            className={`my-5 font-medium text-black h-10 w-10 rounded-full text-center text-sm hover:text-blue-500 ${
              props.activeButton === 1 ? "bg-blue-200" : "bg-gray-100"
            }`}
          >
            <img src={job} alt="Applied Jobs" className="h-[20px] mx-auto" />
          </button>
        </Link>
        <Link to="/dashboard/resumes" className="mb-7">
          <button
            className={`my-5 font-medium text-black h-10 w-10 rounded-full text-center text-sm hover:text-blue-500 ${
              props.activeButton === 0 ? "bg-blue-200" : "bg-gray-100"
            }`}
          >
            <img src={resume} alt="resume" className="h-[20px] mx-auto" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
