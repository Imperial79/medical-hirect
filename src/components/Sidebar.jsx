import React from "react";
import home from "../assets/home.svg";
import resume from "../assets/resume.svg";
import profile from "../assets/profile.svg";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-white text-white w-20 h-screen fixed top-0 left-0 py-4 px-2 md:flex flex-col items-center justify-center hidden">
      <div className="mb-7">
        <Link
          to="/"
          className="block font-medium text-black text-center text-sm hover:text-blue-500"
        >
          <img src={home} alt="Home" className="h-[30px] mx-auto mb-2" />
          Home
        </Link>
      </div>
      <div className="mb-7">
        <Link
          to="#"
          className="block font-medium text-black text-center text-sm hover:text-blue-500"
        >
          <img src={resume} alt="Resumes" className="h-[30px] mx-auto mb-2" />
          Resumes
        </Link>
      </div>
      <div className="mb-7">
        <Link
          to="/register"
          className="block font-medium text-black text-center text-sm hover:text-blue-500"
        >
          <img src={profile} alt="Profile" className="h-[30px] mx-auto mb-2" />
          Profile
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
