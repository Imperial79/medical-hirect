import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import HospitalCard from "../components/HospitalCard";
import { dbObject } from "../Helper/Constants";
import Scaffold from "../components/Scaffold";

function SearchRecruiters() {
  const [loading, setloading] = useState(false);
  const [pageNo, setpageNo] = useState(0);
  const [searchKey, setsearchKey] = useState("");
  const [recruiterList, setrecruiterList] = useState([]);
  const [totalRecords, settotalRecords] = useState(0);

  // --------functions--------->

  async function fetchRecruitersList() {
    try {
      setloading(true);
      const formData = new FormData();
      formData.append("pageNo", pageNo);
      formData.append("searchKey", searchKey);
      formData.append("city", "");
      formData.append("state", "");
      const response = await dbObject.post(
        "/recruiters/fetch-recruiters.php",
        formData
      );
      console.log(response.data);
      if (!response.data.error) {
        setrecruiterList(response.data.response);
        settotalRecords(response.data.response.totalRecords);
      }
      setloading(false);
    } catch (error) {
      setloading(false);
    }
  }

  useEffect(() => {
    fetchRecruitersList();
  }, [pageNo]);

  return (
    <Scaffold isLoading={loading}>
      <Hero
        title="Search Recruiters"
        subtitle="Search by thousands of reputed recruiters"
        buttonLabel="Search recruiter"
      >
        <div className="md:flex md:gap-4 items-center">
          <div className="w-full">
            <input
              type="text"
              id="base-input"
              className="bg-white border border-gray-200 text-gray-900 text-sm rounded-full block w-full p-2.5 light:bg-gray-700 light:placeholder-gray-400 light:text-white"
              placeholder="Search job titles, keywords, skills etc"
              onChange={(e) => {
                setsearchKey(e.target.value);
              }}
            />
          </div>

          <button
            type="button"
            onClick={fetchRecruitersList}
            className="md:w-auto w-full focus:outline-none text-center text-white bg-[#dc832d] hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 light:focus:ring-yellow-900 whitespace-nowrap text-ellipsis"
          >
            Search Recruiter
          </button>
        </div>
      </Hero>
      <div className="pb-10 md:px-20 px-5 text-black">
        <div className="my-5 md:w-[80%] mx-auto">
          <h1>Search results for "UCLA Health"</h1>
        </div>
        {recruiterList.map((data, index) => (
          <div key={data.id}>
            <HospitalCard data={data} />
          </div>
        ))}
      </div>

      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-around py-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 light:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing{" "}
          <span className="font-semibold text-gray-900 light:text-white">
            {recruiterList.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 light:text-white">
            {totalRecords}
          </span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <button
              onClick={() => {
                if (pageNo > 0) {
                  setpageNo(pageNo - 1);
                }
              }}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
            >
              Previous
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setpageNo(pageNo + 1);
              }}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </Scaffold>
  );
}

export default SearchRecruiters;
