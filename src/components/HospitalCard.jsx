import React from "react";
import { Link } from "react-router-dom";
import location from "../assets/location.svg";
import job from "../assets/job.svg";

function HospitalCard({ data }) {
  return (
    <>
      <Link to={`/about-recruiter?recruiter-id=${data.id}`}>
        <div className="bg-white border p-5 md:mx-auto mx-5 md:w-[80%] rounded-lg md:flex md:gap-5 items-center mb-7 hover:drop-shadow-xl transition duration-400">
          <div className="h-[100px] w-[100px] mx-auto">
            <img
              src={data.image}
              alt="CompanyImage"
              className="w-full h-full "
            />
          </div>

          <div className="w-full">
            <h2 className="text-blue-900 font-medium md:text-[20px] text-sm">
              {data.companyName}
            </h2>

            <div className="mt-2 flex items-center text-gray-700">
              <div className="flex items-center w-1/2">
                <img src={job} alt="Company Logo" className="h-4" />
                <p className="ml-2 font-normal text-[12px] md:text-[15px]">
                  asksalkjas
                </p>
              </div>
              <div className="flex items-center w-1/2">
                <img src={location} alt="Company Logo" className="h-4" />
                <p className="ml-2 font-normal text-[12px] md:text-[15px]">
                  {data.city}, {data.state}
                </p>
              </div>
            </div>

            <div className="items-center inline-flex">
              <p>
                GSTIN:{" "}
                <span className="font-normal text-[12px] md:text-[15px]">
                  {data.gstin}
                </span>
              </p>
            </div>

            <br />

            <div className="items-center inline-flex">
              <p>
                E-mail:{" "}
                <span className="font-normal text-[12px] md:text-[15px]">
                  {data.email}
                </span>
              </p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default HospitalCard;
