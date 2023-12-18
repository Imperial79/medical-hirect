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
import openLinkIcon from "../assets/openLink.svg";

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
        console.log(response.data);
        setresumeList(response.data.response);
      }
      setloading(false);
    } catch (error) {
      setloading(false);
    }
  }
  useEffect(() => {
    fetchResumes();
  }, []);
  return (
    <Scaffold isLoading={loading}>
      <div className="pt-20">
        <h1 className="mt-5 md:text-[30px] text-[30px] text-center font-semibold md:font-medium text-black mb-10">
          Manage Resumes
        </h1>

        <div
          onClick={() => {
            setIsUploadResumeModalOpen(true);
          }}
          className="cursor-pointer p-10 border-dashed bg-gray-100 mx-10 border-black text-black justify-center flex items-center gap-5 rounded-xl lg:max-w-[600px] lg:mx-auto"
        >
          <img src={uploadIcon} alt="upload" className="h-7" />
          Upload a resume
        </div>

        <h1 className="my-5 text-black mx-auto flex justify-center">
          Uploaded resumes
        </h1>

        {resumeList.length > 0 ? (
          resumeList.map((data, index) => (
            <div key={index}>
              <ResumeCard data={data} />
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

function ResumeCard({ data }) {
  return (
    <div className="bg-gray-100 rounded-xl flex gap-1 items-center text-black lg:max-w-[700px] lg:mx-auto mx-5 mb-2">
      <div className="w-full flex p-5 gap-2 overflow-hidden whitespace-nowrap text-ellipsis">
        <img src={resumeIcon} alt="" className="h-6" />
        <h1 className="overflow-hidden whitespace-nowrap text-overflow-ellipsis">
          {data.resumeName}
        </h1>
      </div>
      <img
        src={deleteIcon}
        alt="close-icon"
        onClick={() => {
          // setselectedResume(null);
        }}
        className="h-6 mr-5 object-contain cursor-pointer"
      />
      <img
        src={openLinkIcon}
        alt="close-icon"
        onClick={() => {
          // setselectedResume(null);
        }}
        className="h-5 mr-5 object-contain cursor-pointer invert"
      />
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
