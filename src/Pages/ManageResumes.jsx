import React, { useContext, useEffect, useState } from "react";
import Scaffold from "../components/Scaffold";
import noDataIcon from "../assets/no-data.jpg";
import uploadIcon from "../assets/upload.svg";
import { dbObject } from "../Helper/Constants";
import { Context } from "../Helper/ContextProvider";
import Modal from "../components/Modal";
import deleteIcon from "../assets/trash-outline.svg";
import closeIcon from "../assets/close.svg";
import resumeIcon from "../assets/resume.svg";
import logoSmall from "../assets/logo-transparent.png";
import { Link } from "react-router-dom";

function ManageResumes() {
  const { setAlert } = useContext(Context);
  const [loading, setloading] = useState(false);
  const [resumeList, setresumeList] = useState([]);
  const [isUploadResumeModalOpen, setIsUploadResumeModalOpen] = useState(false);
  // -------------functions----------->

  async function fetchResumes() {
    try {
      setloading(true);
      const response = await dbObject.get("/resume/fetch-my-resumes.php");
      if (!response.data.error) {
        setresumeList(response.data.response);
      }
      setloading(false);
    } catch (error) {
      setloading(false);
    }
  }

  async function deleteResume() {
    try {
      const formData = new FormData();
      formData.append("resumeId", data.id);
      const response = await dbObject.post(
        "/resume/delete-resume.php",
        formData
      );

      if (!response.data.error) {
        fetchResumes();
        setAlert({
          content: response.data.message,
          isDanger: response.data.error,
        });
      }
    } catch (error) {
      setAlert({
        content: "Resume cannot be deleted",
        isDanger: true,
      });
    }
  }
  useEffect(() => {
    fetchResumes();
  }, []);
  return (
    <Scaffold isLoading={loading}>
      <div className="py-20 text-black md:max-w-3xl md:mx-auto mx-5">
        <h1 className="mt-5 md:text-[30px] text-[30px] text-center font-semibold md:font-medium text-black mb-10">
          Manage Resumes
        </h1>
        <button
          onClick={() => {
            setIsUploadResumeModalOpen(true);
          }}
          className="w-full"
        >
          <div className="cursor-pointer p-10 bg-gray-100 text-black justify-center flex items-center gap-5 rounded-xl hover:invert font-medium md:w-auto">
            <img src={uploadIcon} alt="upload" className="h-7" />
            Upload a resume
          </div>
        </button>

        <p className="mt-10">Resume created by Hirehelix</p>
        <Link
          to="/dashboard/resume"
          className="bg-white drop-shadow-md p-5 w-full rounded-lg flex justify-between mt-5 hover:bg-gray-50 hover:drop-shadow-none transition-all"
        >
          <div className="inline-flex gap-3">
            <img src={logoSmall} alt="" className="h-6" />
            <h1 className="overflow-hidden whitespace-nowrap text-overflow-ellipsis">
              Hirehelix Resume
            </h1>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </Link>

        <h1 className="my-5 text-black">Uploaded resumes</h1>

        {resumeList.length > 0 ? (
          resumeList.map((data, index) => (
            <div key={index}>
              <ResumeCard data={data} onDelete={deleteResume} />
            </div>
          ))
        ) : (
          <div className="h-[600px] w-[600px] mx-auto">
            <img src={noDataIcon} alt="no-data" className="object-contain" />
          </div>
        )}
      </div>
      <UploadResumeModal
        isModalOpen={isUploadResumeModalOpen}
        setAlert={setAlert}
        setLoading={setloading}
        toggleModal={() => {
          setIsUploadResumeModalOpen(!isUploadResumeModalOpen);
        }}
        fetchResumes={fetchResumes}
      />
    </Scaffold>
  );
}

export default ManageResumes;

function ResumeCard({ data, onDelete }) {
  return (
    <div className="bg-white drop-shadow-md p-5 w-full rounded-lg flex justify-between mt-5 hover:bg-gray-50 hover:drop-shadow-none transition-all">
      <div className="w-full flex gap-2 overflow-hidden whitespace-nowrap text-ellipsis">
        <img src={resumeIcon} alt="" className="h-6" />
        <h1 className="overflow-hidden whitespace-nowrap text-overflow-ellipsis">
          {data.resumeName}
        </h1>
      </div>
      <div className="inline-flex gap-5 items-center">
        <Link>
          <svg
            onClick={onDelete}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </Link>

        <Link to={data.resume} target="_blank">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

function UploadResumeModal({
  isModalOpen,
  toggleModal,
  setLoading,
  setAlert,
  fetchResumes,
}) {
  const [selectedResume, setselectedResume] = useState(null);

  async function uploadResume() {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("mediaFile", selectedResume);
      formData.append("resumeName", selectedResume.name);
      const response = await dbObject.post(
        "/resume/upload-resume.php",
        formData
      );
      if (!response.data.error) {
        setAlert({
          content: response.data.message,
          isDanger: response.data.error,
        });
        toggleModal();
        fetchResumes();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <Modal isOpen={isModalOpen} onClose={toggleModal}>
      <h2
        className="font-medium text-lg mb-4 flex justify-between items-center
  "
      >
        Upload a resume
        <span
          onClick={toggleModal}
          className="hover:bg-gray-100 p-2 rounded-full"
        >
          <img src={closeIcon} alt="close-icon" className="h-5" />
        </span>
      </h2>
      <input
        type="file"
        name="selectedResume"
        id="selectedResume"
        accept=".pdf, .doc, .docx"
        className="hidden"
        onChange={(e) => {
          setselectedResume(e.target.files[0]);
        }}
      />
      {selectedResume === null ? (
        <>
          <div
            onClick={() => {
              document.getElementById("selectedResume").click();
            }}
            className="mx-auto p-5 w-[70px] h-[70px] bg-gray-50 cursor-pointer"
          >
            <img src={uploadIcon} alt="" />
          </div>
          <h3 className="mx-auto text-center text-sm mt-1">Select resume</h3>
        </>
      ) : (
        <>
          <div className="bg-gray-100 rounded-xl flex gap-1 items-center">
            <div className="w-full flex p-5 gap-2 overflow-hidden whitespace-nowrap text-ellipsis">
              <img src={resumeIcon} alt="" className="h-6" />
              <h1 className="overflow-hidden whitespace-nowrap text-overflow-ellipsis">
                {selectedResume.name}
              </h1>
            </div>

            <img
              src={deleteIcon}
              alt="close-icon"
              onClick={() => {
                setselectedResume(null);
              }}
              className="h-6 rounded-full mr-5 object-contain cursor-pointer"
            />
          </div>
        </>
      )}

      <button
        type="button"
        onClick={uploadResume}
        className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center light:bg-blue-600 light:hover:bg-blue-700 light:focus:ring-blue-800"
      >
        Upload resume
      </button>
    </Modal>
  );
}
