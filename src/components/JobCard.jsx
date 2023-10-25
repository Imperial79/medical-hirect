import React from "react";
import PillTag from "./PillTag";
import { Link } from "react-router-dom";
import save from "../assets/save.svg";
import hospital from "../assets/hospital.svg";
import location from "../assets/location.svg";

function JobCard() {
  return (
    <>
      <Link to="/job-detail">
        <div className="bg-white border p-5 md:mx-auto mx-5 md:w-[80%] rounded-lg md:flex items-center mb-7 hover:drop-shadow-xl transition duration-400">
          <div className="md:w-1/6 md:mr-10 flex justify-between items-center mb-4 md:mb-0">
            <img
              src="https://hospitalcareers.com/files/pictures/emp_logo_2858.jpg"
              alt=""
              className="w-40 "
            />
            <Link to="" className="md:hidden block ">
              <img src={save} alt="" className="ml-2 h-5" />
            </Link>
          </div>

          <div>
            <div className="flex justify-between">
              <h2 className="text-blue-900 font-medium md:text-[20px] text-sm">
                Front Office Admin Support - On cology, Bangalore, India
              </h2>
              <Link to="" className="hidden md:block">
                <img src={save} alt="" className="ml-2 h-5" />
              </Link>
            </div>

            <div className="mt-2 flex items-center text-gray-700">
              <div className="flex items-center w-1/2">
                <img src={hospital} alt="Company Logo" className="h-4" />
                <p className="ml-2 font-normal text-[12px] md:text-[15px]">
                  UCLA Health
                </p>
              </div>
              <div className="flex items-center w-1/2">
                <img src={location} alt="Company Logo" className="h-4" />
                <p className="ml-2 font-normal text-[12px] md:text-[15px]">
                  Bangalore, Karnataka, India
                </p>
              </div>
            </div>

            <h2 className="text-gray-500 mt-4 text-[12px] md:text-[15px] max2lines">
              Description In this role, you will provide general and
              administrative support to the staff, physicians and patients of
              the Oncology Clinic. Schedule new consultations, coordinate and
            </h2>

            <div className="flex flex-wrap md:mt-5 mt-2 gap-2">
              <PillTag label="Full-Time" />
              <PillTag label="Immediate Joining" />
              <PillTag label="Fresher" />
              <PillTag label="BE or BC" />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default JobCard;
