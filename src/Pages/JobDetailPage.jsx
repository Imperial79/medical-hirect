import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import job from "../assets/job.svg";
import hospital from "../assets/hospital.svg";
import hashTag from "../assets/hash-tag.svg";
import save from "../assets/save.svg";
import saveFilled from "../assets/save-filled.svg";
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
import uploadIcon from "../assets/upload.svg";
import logoSmall from "../assets/logo-transparent.png";
import { KButton, KGrid } from "../components/components";

function JobDetailPage() {
  const { user, showAlert } = useContext(Context);
  const [loading, setloading] = useState(false);
  let query = new URLSearchParams(useLocation().search);
  const [vacancyData, setvacancyData] = useState({});
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [resumeList, setresumeList] = useState([]);
  const [selectedResume, setselectedResume] = useState(0);
  const vacancyId = query.get("vacancy-id");
  const [isBookmarked, setisBookmarked] = useState(false);
  const [isApplied, setisApplied] = useState(false);
  const navigator = useNavigate();

  const toggleApplyModal = () => {
    setIsApplyModalOpen(!isApplyModalOpen);
  };

  // ------------------->

  async function fetchJobDetails() {
    try {
      setloading(true);
      const formData = new FormData();
      formData.append("vacancyId", vacancyId);
      const response = await dbObject.post(
        "/vacancy/fetch-vacancy-details.php",
        formData
      );
      if (!response.data.error) {
        setvacancyData(response.data.response);
        setisBookmarked(response.data.response.isBookmarked == "true");
        setisApplied(response.data.response.isApplied == "true");
      } else {
        navigator("/");
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
        toggleApplyModal();
        setloading(false);
      }
    } catch (error) {
      setloading(false);
    }
  }

  async function bookmarkVacancy() {
    try {
      setloading(true);
      const formData = new FormData();
      formData.append("vacancyId", vacancyId);
      const response = await dbObject.post(
        "/vacancy/bookmark-vacancy.php",
        formData
      );

      setisBookmarked(!isBookmarked);

      showAlert(response.data.message, response.data.error);
      setloading(false);
    } catch (error) {
      setloading(false);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchJobDetails();
  }, []);

  return (
    <Scaffold isLoading={loading}>
      <div className="pt-20 pb-10 lg:px-20 md:px-5 px-5 text-black">
        <div className="max-w-4xl w-full mx-auto bg-white rounded-xl drop-shadow-2xl z-20">
          <div className="flex mt-[17px] items-center justify-between">
            <div className="md:h-[400px] h-[200px] w-full rounded-t-xl overflow-hidden brightness-50">
              <img
                src={vacancyData.companyImage}
                alt="recruiter-image"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="p-5">
            <SaveButton
              bookmarkVacancy={bookmarkVacancy}
              isBookmarked={isBookmarked}
            />

            <h1 className="text-black font-medium text-lg mt-5">
              <span className="text-blue-700 font-semibold">
                {vacancyData.roleTitle}
              </span>{" "}
              | {vacancyData.subRole} | {vacancyData.companyName}
            </h1>

            <div className="mt-2 items-center text-gray-700 text-[15px] md:text-[17px]">
              <div className="lg:grid md:grid lg:grid-cols-2 md:grid-cols-2">
                <>
                  <div className="flex items-center gap-2 md:mb-0 mb-4">
                    <img src={hospital} alt="Company Logo" className="h-5" />

                    <Link to={vacancyData.website} target="_blank">
                      <p className="font-normal hover:underline flex items-center gap-2">
                        {vacancyData.companyName}
                        <img src={openLinkIcon} alt="" className="h-4 invert" />
                      </p>
                    </Link>
                  </div>

                  <div className="mt-2 gap-2 flex items-center md:mb-0 mb-4">
                    <img src={location} alt="Company Logo" className="h-5" />
                    <p className="font-normal">
                      {vacancyData.companyCity}, {vacancyData.companyState}
                    </p>
                  </div>
                </>

                <>
                  <div className="flex items-center gap-2 md:mb-0 mb-4">
                    <img src={hashTag} alt="Company Logo" className="h-5" />
                    <p className="font-normal">JOB ID: {vacancyData.id}</p>
                  </div>
                  <div className="mt-2 flex gap-2 items-center md:mb-0 mb-4">
                    <img src={date} alt="Company Logo" className="h-5" />

                    <p className="font-normal">
                      Posted On:{" "}
                      {new Date(vacancyData.postDate).toLocaleDateString()}
                    </p>
                  </div>
                </>
              </div>
              <div className={`${isApplied ? "hidden" : ""} my-5`}>
                {user != null ? (
                  <button
                    type="button"
                    onClick={fetchResumes}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800 md:w-auto w-full justify-center"
                  >
                    Apply Now
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800 inline-flex items-center gap-2 md:w-auto w-full justify-center"
                  >
                    Login to Apply
                    <img src={openLinkIcon} alt="" className="h-4" />
                  </Link>
                )}
              </div>
              <p
                className={`${
                  isApplied ? "" : "hidden"
                } my-10 text-gray-500 font-medium`}
              >
                You've already applied for this job
              </p>
              <div className="grid grid-cols-3 md:gap-5 gap-3">
                <StatsCard label={"CTC"} content={vacancyData.salary} />
                <StatsCard
                  label={"Experience"}
                  content={vacancyData.experience}
                />
                <StatsCard label={"Openings"} content={vacancyData.opening} />
              </div>

              <DescriptionCard
                title="Requirements"
                content={vacancyData.requirements}
              />
              <DescriptionCard
                title="Preferred Point of Contact"
                content={vacancyData.ppoc}
              />
              <DescriptionCard
                title="Special Note"
                content={vacancyData.specialRemark}
              />
              <div className="flex flex-wrap md:mt-5 mt-2 gap-2">
                {vacancyData?.tags?.split("#").map((data, index) => (
                  <div key={index}>
                    {data !== "" ? <PillTag label={data} /> : <></>}
                  </div>
                ))}
              </div>
              <h1 className="mt-5 font-medium text-[17px]">Attachment</h1>
              <Link
                to={vacancyData.attachment}
                target="_blank"
                className="group hover:bg-black hover:text-white mt-3 bg-gray-50 p-5 rounded-xl font-medium inline-flex items-center gap-5 transition-all"
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
      </div>

      <ApplyJobModal
        isModalOpen={isApplyModalOpen}
        toggleModal={toggleApplyModal}
        setLoading={setloading}
        showAlert={showAlert}
        resumeList={resumeList}
        selectedResume={selectedResume}
        setselectedResume={setselectedResume}
        vacancyId={vacancyId}
        setisApplied={setisApplied}
      />
    </Scaffold>
  );
}

export default JobDetailPage;

function SaveButton({ bookmarkVacancy, isBookmarked }) {
  return (
    <button
      onClick={bookmarkVacancy}
      className={`flex gap-2 items-center rounded-full px-3 py-1.5 text-[12px] font-medium ${
        isBookmarked
          ? "bg-transparent text-black"
          : "bg-black text-white border"
      }`}
    >
      {isBookmarked ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-3 h-3"
          >
            <path
              fillRule="evenodd"
              d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
              clipRule="evenodd"
            />
          </svg>
          Saved
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-3 h-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
            />
          </svg>
          Save
        </>
      )}
    </button>
  );
}

function StatsCard({ label, content }) {
  return (
    <div className="px-5 py-2 bg-blue-50 border border-blue-400 rounded-xl text-center">
      <h1 className="font-semibold md:text-xl text-lg">{content}</h1>
      <h3 className="md:text-xl text-sm">{label}</h3>
    </div>
  );
}

const TextWithLineBreaks = ({ text }) => {
  if (!text) {
    return null; // or handle the case when text is undefined or empty
  }

  const formattedText = text.replace(/\n/g, "<br/>");
  return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
};

function DescriptionCard({ title, content }) {
  return (
    <>
      <h1 className="mt-5 font-medium text-[17px]">{title}</h1>
      <h2 className="mt-3 md:text-[15px] text-sm bg-gray-50 border border-gray-200 p-5 rounded-xl">
        <TextWithLineBreaks text={content} />
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
      <div
        className={`${
          selectedResume !== data.id
            ? "-translate-x-full opacity-0"
            : "-translate-x-0 opacity-100"
        } h-[30px] w-[5px] bg-blue-700 rounded-full transition-all flex-shrink-0 text-start`}
      ></div>
      <img
        src={data.resumeName === "Hirehelix Resume" ? logoSmall : resumeIcon}
        alt=""
        className="h-5 flex-shrink-0"
      />
      <p className="text-start ml-2 whitespace-nowrap overflow-hidden">
        {data.resumeName}
      </p>
    </button>
  );
}

function ApplyJobModal({
  isModalOpen,
  toggleModal,
  setLoading,
  showAlert,
  resumeList,
  selectedResume,
  setselectedResume,
  vacancyId,
  setisApplied,
}) {
  async function applyJob() {
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("vacancyId", vacancyId);
      formData.append("resumeId", selectedResume);
      formData.append(
        "optedResumeBuilder",
        selectedResume === 0 ? "true" : "false"
      );
      const response = await dbObject.post(
        "/application/apply-for-vacancy.php",
        formData
      );

      if (!response.data.error) {
        toggleModal();
        setisApplied(true);
      }
      showAlert(response.data.message, response.data.error);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }
  const navigator = useNavigate();
  return (
    <Modal isOpen={isModalOpen} onClose={toggleModal}>
      <h2
        className="font-medium text-lg mb-4 flex justify-between items-center
    "
      >
        Select a resume
        <span
          onClick={toggleModal}
          className="hover:bg-gray-100 p-2 rounded-full"
        >
          <img src={closeIcon} alt="close-icon" className="h-5" />
        </span>
      </h2>

      <ResumeCard
        data={{ id: 0, resumeName: "Hirehelix Resume" }}
        onClick={() => {
          setselectedResume(0);
        }}
        selectedResume={selectedResume}
      />

      {resumeList.map((data, index) => (
        <div key={index}>
          <ResumeCard
            onClick={() => {
              setselectedResume(data.id);
            }}
            data={data}
            selectedResume={selectedResume}
          />
        </div>
      ))}
      <div className="flex justify-between items-center mt-6 gap-5">
        <KButton onClick={applyJob} label="Apply" margin="mb-0" />
        <KButton
          // linkTo="/dashboard/manage-resumes"
          onClick={() => {
            navigator("/dashboard/manage-resumes");
          }}
          label="Upload Resume"
          hoverColor="gray-300"
          btnColor="gray-200"
          labelColor="black"
          margin="mb-0"
        />
      </div>
    </Modal>
  );
}
