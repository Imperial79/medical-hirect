import React, { useEffect, useState } from "react";
import Scaffold from "../components/Scaffold";
import { dbObject } from "../Helper/Constants";
import hospitalIcon from "../assets/hospital.svg";
import resumeIcon from "../assets/resume.svg";
import { Link } from "react-router-dom";
import noDataIcon from "../assets/no-data.jpg";
import logoSmall from "../assets/logo-transparent.png";

function AppliedApplications() {
  const [loading, setloading] = useState(false);
  const [pageNo, setpageNo] = useState(0);
  const [appliedApplicationList, setappliedApplicationList] = useState([]);

  // -------------functions----------->

  async function fetchBookmarked() {
    try {
      setloading(true);
      const formData = new FormData();
      formData.append("pageNo", pageNo);
      const response = await dbObject.post(
        "/application/fetch-applied-applications.php",
        formData
      );
      if (!response.data.error) {
        setappliedApplicationList(response.data.response);
      }
      setloading(false);
    } catch (error) {
      setloading(false);
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBookmarked();
  }, []);

  return (
    <Scaffold isLoading={loading}>
      <div className="pt-20">
        <h1 className="mt-5 md:text-[30px] text-[30px] text-center font-semibold md:font-medium text-black mb-10">
          Applied Applications
        </h1>

        {appliedApplicationList.length > 0 ? (
          appliedApplicationList.map((data, index) => (
            <div key={index}>
              <AppliedCard data={data} />
            </div>
          ))
        ) : (
          <div className="h-[600px] w-[600px] mx-auto">
            <img src={noDataIcon} alt="no-data" className="object-contain" />
          </div>
        )}
      </div>
    </Scaffold>
  );
}

export default AppliedApplications;

function AppliedCard({ data }) {
  return (
    <Link to={`/job-detail?vacancy-id=${data.vacancyId}`}>
      <div className="text-black bg-white border p-5 md:mx-auto mx-5 md:w-[80%] rounded-lg md:flex items-center mb-7 hover:drop-shadow-xl transition duration-400">
        <div className="md:mr-10 flex justify-between items-center mb-4 md:mb-0">
          <div className="h-[100px] w-[100px] mx-auto">
            <img
              src={data.companyImage}
              alt="CompanyImage"
              className="w-full h-full"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between">
            <h2 className="text-blue-900 font-medium md:text-[20px] text-[20px]">
              {data.roleTitle} | {data.subRole}
            </h2>
          </div>

          <div className="mt-2 md:flex gap-5 items-center text-gray-700">
            <div className="flex items-center md:mb-0 mb-2">
              <img src={hospitalIcon} alt="" className="h-4" />
              <p className="ml-2 font-normal text-[15px] md:text-[15px]">
                {data.companyName}
              </p>
            </div>
          </div>

          <h2 className="text-start text-gray-500 mt-4 text-[15px] md:text-[15px] max2lines mb-2">
            {data.requirements}
          </h2>

          <div className="inline-flex flex-wrap items-center gap-5 my-5">
            <div className="bg-gray-100 rounded-full px-2 py-1 flex items-center gap-2 text-sm font-medium">
              CTC
              <div className="bg-blue-700 rounded-full px-3 py-1 text-white font-medium">
                {data.salary}
              </div>
            </div>
            <div className="bg-gray-100 rounded-full px-2 py-1 flex items-center gap-2 text-sm font-medium">
              Experience
              <div className="bg-blue-700 rounded-full px-3 py-1 text-white font-medium">
                {data.experience}
              </div>
            </div>
            <div
              className={`${
                data.status === "In-Review"
                  ? "bg-purple-100 text-purple-700"
                  : data.status === "Rejected"
                  ? "bg-red-100 text-red-700"
                  : data.status === "Applied"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }  rounded-full px-3 py-1 flex items-center gap-2 text-sm font-medium`}
            >
              {data.status}
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-2">
              <img
                src={data.optedResumeBuilder == "true" ? logoSmall : resumeIcon}
                alt=""
                className="h-5 w-5"
              />
              <p className="text-sm text-gray-500">
                {data.optedResumeBuilder == "true"
                  ? "Hirehelix Resume"
                  : data.resumeName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
