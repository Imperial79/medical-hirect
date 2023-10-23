import React from "react";
import { Link } from "react-router-dom";
import job from "./assets/job.svg";
import hospital from "./assets/hospital.svg";
import hashTag from "./assets/hash-tag.svg";
import save from "./assets/save.svg";
import date from "./assets/date.svg";
import location from "./assets/location.svg";

function JobDetailPage() {
  let arr = [1, 2, 3, 5];
  return (
    <div className="pt-20 pb-10 md:px-20 px-5 md:flex md:gap-4 text-black">
      <div className="w-full">
        <div className="justify-start">
          <div className="flex mt-[17px] items-center justify-between">
            <img
              src="https://hospitalcareers.com/files/pictures/emp_logo_2858.jpg"
              alt=""
              className="md:w-80 w-[50%]"
            />

            <a href="" className="md:hidden block">
              <img src={save} alt="" className="ml-10 h-5" />
            </a>
          </div>

          <div className="flex mt-10 items-center">
            <h1 className="md:w-[60%] text-blue-900 font-medium md:text-[25px] text-[17px]">
              Front Office Admin Support - On cology, Bangalore, India
            </h1>
            <a href="" className="hidden md:block">
              <img src={save} alt="" className="ml-10 h-5" />
            </a>
          </div>

          <div className="mt-2 items-center text-gray-700 text-[13px] md:text-[17px]">
            <div className="flex">
              <div className=" md:w-1/2">
                <div className="flex items-center">
                  <img src={hospital} alt="Company Logo" className="h-6" />
                  <Link to="/about-company">
                    <p className="ml-2 font-normal">UCLA Health</p>
                  </Link>
                </div>
                <div className="mt-2 flex items-center text-[13px] md:text-[17px]">
                  <img src={location} alt="Company Logo" className="h-6" />
                  <p className="ml-2 font-normal ">
                    Bangalore, Karnataka, India
                  </p>
                </div>
              </div>

              <div className="md:w-1/2 justify-end">
                <div className="flex items-center">
                  <img src={hashTag} alt="Company Logo" className="h-6" />
                  <p className="ml-2 font-normal">JOB ID: 122345GH</p>
                </div>
                <div className="mt-2 flex items-center text-[13px] md:text-[17px]">
                  <img src={date} alt="Company Logo" className="h-6" />
                  <p className="ml-2 font-normal ">Posted On: 29-03-2022</p>
                </div>
              </div>
            </div>
            <button
              to="/"
              className="sticky top-0 mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800"
            >
              Apply Now
            </button>
            <h1 className="mt-5 font-semibold"> Job Description</h1>
            <h2 className="mt-3 md:text-[15px] text-sm">
              Come to Memphis and join a very busy practice seeking to replace a
              retiring physician. We seek a well-trained interventional
              cardiologist for a full-time, employed position. Due to tremendous
              community need this is an excellent opportunity for candidates
              looking to hit the ground running and be busy quickly. Along with
              the great administrative team the group also has a fantastic and
              experienced support staff. As a member of our large
              multi-specialty group you will have full support from both of our
              local hospitals and enjoy: Guaranteed salary with production bonus
              Comprehensive benefits including health, dental, life, disability,
              401k with matching and salary deferment program Billing, Coding,
              Collections done in-house Top Executive & Administrative support,
              IT, HR, legal Vacation + CME with a stipend Malpractice insurance
              Memphis is a vibrant city located along the Mississippi River and
              is known for its musical history and cuisine. Blues, jazz, and
              rock and roll spill out from the clubs along Beale Street, and
              restaurants dish up some of the nation's best barbeque and soul
              food. Nicknamed “The Birthplace of Rock and Roll”, Memphis is also
              home to the Sun Studio, where musical legends such as Elvis
              Presley, B.B. King, and Johnny Cash all recorded albums. Elvis
              Presley's Graceland mansion is one of the most-visited houses in
              the country. Interested candidates should submit a current CV for
              immediate consideration. Sorry, no visa sponsorship is available
              for this position.
            </h2>

            <h1 className="mt-5 font-semibold">Emploment Type</h1>
            <h2 className="mt-3 md:text-[15px] text-sm">Full-Time</h2>
          </div>
        </div>
      </div>

      <div className="md:w-1/2 mt-6 md:mt-5">
        <div className="flex items-center justify-between mb-5">
          <h1>Jobs by UCLA Health</h1>
        </div>

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
  );
}

export default JobDetailPage;
