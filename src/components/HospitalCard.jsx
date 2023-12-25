import React, { useState } from "react";
import { Link } from "react-router-dom";
import location from "../assets/location.svg";
import job from "../assets/job.svg";
import { dbObject } from "../Helper/Constants";

function HospitalCard({ data }) {
  const [isFollowing, setisFollowing] = useState(false);

  async function follow() {
    try {
      const formData = new FormData();
      formData.append("recruiterId", data.id);
      await dbObject.post("/recruiters/follow-recruiter.php", formData);

      setisFollowing(!isFollowing);
    } catch (error) {}
  }

  return (
    <>
      <div className="bg-white border p-5 md:mx-auto mx-5 md:w-[80%] rounded-lg md:flex md:gap-5 items-center mb-7">
        <div className="h-[100px] w-[100px] mx-auto">
          <img src={data.image} alt="CompanyImage" className="w-full h-full " />
        </div>

        <div className="w-full">
          <div className="flex justify-between items-start">
            <Link to={data.website} target="_blank">
              <h2 className="text-blue-900 font-medium md:text-[20px] text-sm hover:underline">
                {data.companyName}
              </h2>
            </Link>

            <div className="cursor-pointer">
              {isFollowing ? (
                <>
                  <svg
                    onClick={follow}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-yellow-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </>
              ) : (
                <>
                  <svg
                    onClick={follow}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
                    />
                  </svg>
                </>
              )}
            </div>
          </div>

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
    </>
  );
}

export default HospitalCard;
