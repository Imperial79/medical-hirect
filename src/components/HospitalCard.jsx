import React from "react";
import { Link } from "react-router-dom";
import PillTag from "./PillTag";

function HospitalCard() {
  return (
    <>
      <Link to="/about-company">
        <div className="bg-white border p-5 md:mx-auto mx-5 md:w-[80%] rounded-lg md:flex items-center mb-7 hover:drop-shadow-xl transition duration-400">
          <div className="md:w-1/6 md:mr-10 flex justify-between items-center mb-4 md:mb-0">
            <img
              src="https://hospitalcareers.com/files/pictures/emp_logo_2858.jpg"
              alt=""
              className="w-40 "
            />
            <a href="" className="md:hidden block ">
              <img src="src/assets/save.svg" alt="" className="ml-2 h-5" />
            </a>
          </div>

          <div>
            <div className="flex justify-between">
              <h2 className="text-blue-900 font-medium md:text-[20px] text-sm">
                UCLA Health
              </h2>
              {/* <a href="" className="hidden md:block">
                <img src="src/assets/save.svg" alt="" className="ml-2 h-5" />
              </a> */}
            </div>

            <div className="mt-2 flex items-center text-gray-700">
              <div className="flex items-center w-1/2">
                {/* <img
                  src="src/assets/job.svg"
                  alt="Company Logo"
                  className="h-4"
                /> */}
                <p className="ml-2 font-normal text-[12px] md:text-[15px]">
                  201 Job Listings
                </p>
              </div>
              <div className="flex items-center w-1/2">
                <img
                  src="src/assets/location.svg"
                  alt="Company Logo"
                  className="h-4"
                />
                <p className="ml-2 font-normal text-[12px] md:text-[15px]">
                  Bangalore, Karnataka, India
                </p>
              </div>
            </div>

            <h2 className="text-gray-500 mt-4 text-[12px] md:text-[15px] max2lines">
              Established in 2004 and headquartered in the metropolitan
              Washington, DC area, ATS is an award winning, Maryland Dept of
              Transportation (MDOT) Minority Business Enterprise (MBE), and Dept
              of Veterans Affairs - CVE verified SDVO/VO small business.
            </h2>

            {/* <div className="flex flex-wrap md:mt-5 mt-2 gap-2">
              <PillTag label="Full-Time" />
              <PillTag label="Immediate Joining" />
              <PillTag label="Fresher" />
              <PillTag label="BE or BC" />
            </div> */}
          </div>
        </div>
      </Link>
    </>
  );
}

export default HospitalCard;
