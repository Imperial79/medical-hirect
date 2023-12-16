import React from "react";
import PillTag from "./PillTag";
import { Link, useNavigate } from "react-router-dom";
import save from "../assets/save.svg";
import saveFilled from "../assets/save-filled.svg";
import hospital from "../assets/hospital.svg";
import location from "../assets/location.svg";

function JobCard({ data }) {
  const navigate = new useNavigate();
  async function bookmarkVacancy() {
    try {
      setloading(true);
      const formData = new FormData();
      formData.append("vacancyId", vacancyId);
      const response = await dbObject.post(
        "/vacancy/bookmark-vacancy.php",
        formData
      );
      setAlert({
        content: response.data.message,
        isDanger: response.data.error,
      });
      setloading(false);
    } catch (error) {
      setloading(false);
    }
  }
  return (
    <>
      <Link
        to={`/job-detail?vacancy-id=${data.id}`}
        className="bg-white border p-5 md:mx-auto mx-5 md:w-[80%] rounded-lg md:flex items-center mb-7 hover:drop-shadow-xl transition duration-400"
      >
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
              {data.roleTitle}
            </h2>
          </div>

          <div className="mt-2 md:flex gap-5 items-center text-gray-700">
            <div className="flex items-center md:mb-0 mb-2">
              <img src={hospital} alt="Company Logo" className="h-4" />
              <p className="ml-2 font-normal text-[15px] md:text-[15px]">
                {data.companyName}
              </p>
            </div>
            <div className="flex items-center">
              <img src={location} alt="Company Logo" className="h-4" />
              <p className="ml-2 font-normal text-[15px] md:text-[15px]">
                {data.companyCity}, {data.companyState}
              </p>
            </div>
          </div>

          <h2 className="text-start text-gray-500 mt-4 text-[15px] md:text-[15px] max2lines mb-2">
            {data.requirements}
          </h2>

          <div className="flex flex-wrap md:mt-5 mt-2 gap-2">
            {data?.tags?.split("#").map((data, index) => (
              <div key={index}>
                <PillTag label={data} />
              </div>
            ))}
          </div>
        </div>
      </Link>
    </>
  );
}

export default JobCard;
