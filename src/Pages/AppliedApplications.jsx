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
      <div className="pt-20 max-w-5xl mx-auto">
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
      <div className="kProductCard text-black">
        <h2 className="text-blue-700 font-medium text-[15px]">
          {data.roleTitle}
          {data.subRole && <span> | {data.subRole}</span>}
        </h2>

        <div className="flex items-center mb-5 mt-2 gap-2">
          <img src={hospitalIcon} alt="" className="h-3" />
          <p className="font-normal text-[12px]">{data.companyName}</p>
        </div>

        <p className="text-[12px] text-gray-500 font-medium mt-2 mb-1">
          Job requirements
        </p>
        <h2 className="text-start text-gray-500 text-[13px] max2lines mb-5">
          {data.requirements}
        </h2>

        <div className="inline-flex flex-wrap items-center gap-3">
          <div className="bg-gray-100 rounded-full px-2 py-1 flex items-center gap-2 text-[10px] font-medium">
            CTC
            <div className="bg-blue-700 rounded-full px-3 py-1 text-white font-medium">
              {data.salary}
            </div>
          </div>
          <div className="bg-gray-100 rounded-full px-2 py-1 flex items-center gap-2 text-[10px] font-medium">
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
            }  rounded-full px-3 py-1 flex items-center gap-2 text-[10px] font-medium`}
          >
            {data.status}
          </div>
        </div>
        <div>
          <div className="inline-flex items-center gap-2 mt-5 bg-gray-100 px-2 py-1 rounded-lg border">
            <img
              src={data.optedResumeBuilder == "true" ? logoSmall : resumeIcon}
              alt="resume-logo"
              className="h-5 w-5"
            />
            <p className="text-[11px] font-medium text-gray-500">
              {data.optedResumeBuilder == "true"
                ? "Hirehelix Resume"
                : data.resumeName}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
