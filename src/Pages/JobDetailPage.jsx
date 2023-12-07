import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import job from "../assets/job.svg";
import hospital from "../assets/hospital.svg";
import hashTag from "../assets/hash-tag.svg";
import save from "../assets/save.svg";
import date from "../assets/date.svg";
import location from "../assets/location.svg";
import openLinkIcon from "../assets/openLink.svg";
import resumeIcon from "../assets/resume.svg";
import closeIcon from "../assets/close.svg";
import attachmentIcon from "../assets/attachment.svg";
import { dbObject } from "../Helper/Constants";
import { Context } from "../Helper/ContextProvider";
import Scaffold from "../components/Scaffold";
import PillTag from "../components/PillTag";
import Modal from "../components/Modal";

function JobDetailPage() {
  const { user } = useContext(Context);
  const [loading, setloading] = useState(false);
  let arr = [1, 2, 3, 5];
  let query = new URLSearchParams(useLocation().search);
  const [vacancyData, setvacancyData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resumeList, setresumeList] = useState([]);
  const [selectedResume, setselectedResume] = useState(0);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // ------------------->

  async function fetchJobDetails() {
    try {
      setloading(true);
      const formData = new FormData();
      formData.append("vacancyId", query.get("vacancy-id"));
      const response = await dbObject.post(
        "/vacancy/fetch-vacancy-details.php",
        formData
      );
      console.log(response.data);
      if (!response.data.error) {
        setvacancyData(response.data.response);
      }
      setloading(false);
    } catch (error) {
      setloading(false);
    }
  }

  async function fetchResumes() {
    try {
      setloading(true);
      const response = await dbObject.get("/resume/fetch-my-resumes.php");

      if (!response.data.error) {
        setresumeList(response.data.response);
        console.log(resumeList);
        openModal();
      }
      setloading(false);
    } catch (error) {
      setloading(false);
    }
  }

  useEffect(() => {
    fetchJobDetails();
  }, []);

  return (
    <Scaffold isLoading={loading}>
      <div className="pt-20 pb-10 lg:px-20 md:px-5 px-5 md:grid md:grid-cols-6 md:gap-5 text-black">
        <div className="col-span-4 w-full">
          <div className="justify-start">
            <div className="flex mt-[17px] items-center">
              <div className="md:h-28 h-20">
                <img
                  src={vacancyData.companyImage}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </div>

              <button className="md:hidden flex gap-2 items-center">
                <img src={save} alt="" className="ml-10 h-5" />
              </button>
            </div>

            <div className="flex mt-10 items-center">
              <h1 className="md:w-[60%] text-blue-900 font-medium md:text-[25px] text-[17px]">
                {vacancyData.roleTitle} | {vacancyData.companyName}
              </h1>
              <button
                type="button"
                className="hidden md:block rounded-full p-3 hover:bg-gray-100 transition-all"
              >
                <img src={save} alt="" className="h-5" />
              </button>
            </div>

            <div className="mt-2 items-center text-gray-700 text-[13px] md:text-[17px]">
              <div className="lg:grid md:grid lg:grid-cols-2 md:grid-cols-2">
                <>
                  <div className="flex items-center gap-2">
                    <img src={hospital} alt="Company Logo" className="h-5" />

                    <Link to={vacancyData.website} target="_blank">
                      <p className="font-normal hover:underline flex items-center gap-2">
                        {vacancyData.companyName}
                        <img src={openLinkIcon} alt="" className="h-4 invert" />
                      </p>
                    </Link>
                  </div>

                  <div className="mt-2 gap-2 flex items-center text-[13px] md:text-[17px]">
                    <img src={location} alt="Company Logo" className="h-5" />
                    <p className="font-normal">
                      {vacancyData.companyCity}, {vacancyData.companyState}
                    </p>
                  </div>
                </>

                <>
                  <div className="flex items-center gap-2 md:mt-0 mt-2">
                    <img src={hashTag} alt="Company Logo" className="h-5" />
                    <p className="font-normal">JOB ID: {vacancyData.id}</p>
                  </div>
                  <div className="mt-2 flex gap-2 items-center text-[13px] md:text-[17px]">
                    <img src={date} alt="Company Logo" className="h-5" />

                    <p className="font-normal ">
                      Posted On:{" "}
                      {new Date(vacancyData.postDate).toLocaleDateString()}
                    </p>
                  </div>
                </>
              </div>

              <div className="my-5">
                {user != null ? (
                  <button
                    type="button"
                    onClick={fetchResumes}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800"
                  >
                    Apply Now
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800 inline-flex items-center gap-2"
                  >
                    Login to Apply
                    <img src={openLinkIcon} alt="" className="h-4" />
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-3 md:gap-5 gap-3">
                <div className="px-5 py-2 bg-blue-50 border border-blue-400 rounded-xl text-center">
                  <h1 className="font-semibold text-xl">
                    {vacancyData.salary}
                  </h1>
                  CTC
                </div>
                <div className="px-5 py-2 bg-blue-50 border border-blue-400 rounded-xl text-center">
                  <h1 className="font-semibold text-xl">
                    {vacancyData.experience}
                  </h1>
                  Experience
                </div>
                <div className="px-5 py-2 bg-blue-50 border border-blue-400 rounded-xl text-center">
                  <h1 className="font-semibold text-xl">
                    {vacancyData.opening}
                  </h1>
                  Openings
                </div>
              </div>

              <DescriptionCard
                title="Requirements"
                content={vacancyData.requirements}
              />
              <DescriptionCard
                title="Preffered Point of Contact"
                content={vacancyData.ppoc}
              />
              <DescriptionCard
                title="Special Note"
                content={vacancyData.specialRemark}
              />
              <DescriptionCard
                title="Employement Type"
                content={vacancyData.employmentType}
              />

              <div className="flex flex-wrap md:mt-5 mt-2 gap-2">
                {vacancyData?.tags?.split("#").map((data, index) => (
                  <PillTag label={data} />
                ))}
              </div>

              <h1 className="mt-5 font-medium text-[17px]">Attachment</h1>
              <Link
                to={vacancyData.attachment}
                target="_blank"
                className="group hover:bg-black hover:text-white mt-3 bg-gray-50 p-5 rounded-xl font-medium inline-flex items-center gap-5"
              >
                <img
                  src={attachmentIcon}
                  alt="attachment-icon"
                  className="h-5 group-hover:invert"
                />
                {vacancyData.attachmentName}
                <img
                  src={openLinkIcon}
                  alt="openLink-icon"
                  className="group-hover:invert-0 invert h-5"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="col-span-2 mt-6 md:mt-5">
          <div className="flex items-center justify-between mb-5">
            <h1>Jobs by {vacancyData.companyName}</h1>
          </div>

          {arr.map((element, index) => {
            return (
              <Link key={index} to="/job-detail">
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
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2
          className="font-medium text-lg mb-4 flex justify-between items-center
        "
        >
          Select a resume
          <span
            onClick={closeModal}
            className="hover:bg-gray-100 p-2 rounded-full"
          >
            <img src={closeIcon} alt="close-icon" className="h-5" />
          </span>
        </h2>
        {resumeList.map((data, index) => (
          <div key={data.id}>
            <ResumeCard
              onClick={() => {
                setselectedResume(data.id);
              }}
              data={data}
              selectedResume={selectedResume}
            />
          </div>
        ))}
      </Modal>
    </Scaffold>
  );
}

export default JobDetailPage;

function DescriptionCard({ title, content }) {
  return (
    <>
      <h1 className="mt-5 font-medium text-[17px]">{title}</h1>
      <h2 className="mt-3 md:text-[15px] text-sm bg-gray-50 border border-gray-200 p-5 rounded-xl">
        {content}
      </h2>
    </>
  );
}

function ResumeCard({ onClick, data, selectedResume }) {
  return (
    <button
      onClick={onClick}
      className={`${
        selectedResume === data.id
          ? "bg-blue-100 border border-blue-500 text-black"
          : "bg-gray-50 border border-blue-50 text-gray-500"
      } px-5 py-4 rounded-xl w-full mb-2 inline-flex gap-2 items-center`}
    >
      <img src={resumeIcon} alt="" className="h-5" />
      {/* <svg ></svg> */}
      {data.resumeName}
    </button>
  );
}
