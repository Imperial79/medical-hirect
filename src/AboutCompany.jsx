import React from "react";
import { Link } from "react-router-dom";
import job from "./assets/job.svg";
import date from "./assets/date.svg";
import location from "./assets/location.svg";

function AboutCompany() {
  let arr = [1, 2, 3, 5];
  return (
    <>
      <div className="pt-20 pb-10 md:px-20 px-5 md:flex md:gap-4">
        <div className="w-full">
          <div className="justify-start">
            <div className="flex mt-[17px] items-center justify-between">
              <img
                src="https://hospitalcareers.com/files/pictures/emp_logo_2858.jpg"
                alt=""
                className="md:w-80 w-[50%]"
              />
            </div>

            <div className="flex mt-10 items-center">
              <h1 className="md:w-[60%] text-blue-900 font-medium md:text-[25px] text-[17px]">
                UCLA Health
              </h1>
            </div>

            <div className="mt-2 items-center text-gray-700 text-[13px] md:text-[17px]">
              <div className="flex">
                <div className=" md:w-1/2">
                  <div className="flex items-center">
                    <img src={job} alt="Company Logo" className="h-6" />
                    <p className="ml-2 font-normal">201 Job Listings</p>
                  </div>
                  <div className="mt-2 flex items-center text-[13px] md:text-[17px]">
                    <img src={location} alt="Company Logo" className="h-6" />
                    <p className="ml-2 font-normal ">
                      Bangalore, Karnataka, India
                    </p>
                  </div>
                </div>

                <div className="md:w-1/2 justify-end">
                  <div className="mt-2 flex items-center text-[13px] md:text-[17px]">
                    <img src={date} alt="Company Logo" className="h-6" />
                    <p className="ml-2 font-normal ">Since 2009</p>
                  </div>
                </div>
              </div>
              <button
                to="/"
                className="sticky top-0 mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800"
              >
                Follow
              </button>
              <h1 className="mt-5 font-semibold">About Company</h1>
              <h2 className="mt-3 md:text-[15px] text-sm">
                UCLA Health is a prominent and well-respected healthcare system
                in the United States. It is closely affiliated with the
                University of California, Los Angeles, and operates numerous
                medical facilities and hospitals, including Ronald Reagan UCLA
                Medical Center, Mattel Children's Hospital, and the David Geffen
                School of Medicine.
                <br />
                <br />
                UCLA Health provides a wide range of medical services, including
                primary care, specialty care, advanced diagnostic and treatment
                options, and medical research.
                <br />
                <br />
                The system operates several hospitals, with the Ronald Reagan
                UCLA Medical Center being one of its most prominent facilities.
                This hospital is known for its high level of care, cutting-edge
                research, and medical expertise.
              </h2>

              {/* <h1 className="mt-5 font-semibold">Emploment Type</h1>
              <h2 className="mt-3 md:text-[15px] text-sm">Full-Time</h2> */}
            </div>
          </div>
        </div>

        <div className="md:w-1/2 mt-6 md:mt-0">
          <h1 className="text-black mb-5">Jobs by UCLA Health</h1>

          {arr.map((element) => {
            return (
              <Link to="/job-detail">
                <div className="border rounded-lg p-2 mb-2 hover:drop-shadow-xl transition duration-400 bg-white">
                  <div className="flex items-center">
                    <img src={job} alt="Company Logo" className="h-5" />
                    <h2 className="ml-3 text-black font-medium max2lines text-sm">
                      Cardiology - Interventional Physician Job with Tenet
                      Healthcare in Memphis, TN
                    </h2>
                  </div>

                  <h2 className="mt-2 text-black text-sm">Memphis, TN</h2>
                  <h2 className="mt-1 text-black text-sm">
                    Posted on: 29-03-2022
                  </h2>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default AboutCompany;
