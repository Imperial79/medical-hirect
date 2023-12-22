import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import HospitalCard from "../components/HospitalCard";
import { dbObject } from "../Helper/Constants";
import Scaffold from "../components/Scaffold";

function SearchRecruiters() {
  const [loading, setloading] = useState(false);
  const [pageNo, setpageNo] = useState(0);
  const [searchKey, setsearchKey] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("Pan India");

  const [stateList, setstateList] = useState([]);
  const [isDropOpen, setisDropOpen] = useState(false);
  const [recruiterList, setrecruiterList] = useState([]);
  const [totalRecords, settotalRecords] = useState(0);

  // --------functions--------->

  async function fetchState() {
    const response = await dbObject.get("/states/fetch-states.php");
    if (!response.data.error) {
      setstateList(response.data.response);
    }
  }

  async function fetchRecruitersList() {
    try {
      setloading(true);
      const formData = new FormData();
      formData.append("pageNo", pageNo);
      formData.append("searchKey", searchKey);
      formData.append("city", city);
      formData.append("state", state);
      const response = await dbObject.post(
        "/recruiters/fetch-recruiters.php",
        formData
      );

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
    fetchState();
  }, []);

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
        <form
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="lg:grid lg:grid-cols-6 gap-2">
            <input
              type="text"
              id="searchKey"
              className="md:col-span-2 w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-full block p-2.5 light:bg-gray-700 light:placeholder-gray-400 light:text-white lg:mb-0 mb-2"
              placeholder="Search job titles, keywords, skills etc"
              onChange={(e) => {
                setsearchKey(e.target.value);
              }}
            />
            <input
              type="text"
              id="city"
              className="md:col-span-2 w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-full block p-2.5 light:bg-gray-700 light:placeholder-gray-400 light:text-white lg:mb-0 mb-2"
              placeholder="Search using city..."
              onChange={(e) => {
                setsearchKey(e.target.value);
              }}
            />
            <div className="w-full">
              <button
                onClick={() => {
                  setisDropOpen(!isDropOpen);
                }}
                id="genderDropdownBtn"
                className="md:col-span-1 w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-full p-2.5 light:bg-gray-700 light:placeholder-gray-400 light:text-white flex items-center overflow-hidden whitespace-nowrap lg:mb-0 mb-2 justify-center"
                type="button"
              >
                {state}
                <svg
                  className="w-2.5 h-2.5 ml-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              <div
                id="genderDropdown"
                name="genderDropdown"
                className={`${
                  isDropOpen ? "absolute" : "hidden"
                } z-10 bg-white rounded-lg shadow md:w-[230px] w-[65%] light:bg-gray-700 pt-3 max-h-[300px] overflow-auto`}
              >
                <ul
                  className="px-3 pb-3 overflow-y-auto text-sm text-gray-700"
                  aria-labelledby="dropdownSearchButton"
                >
                  {stateList.map((data, index) => (
                    <li key={index}>
                      <div
                        className="flex cursor-pointer items-center pl-2 rounded hover:bg-gray-100 py-2"
                        onClick={() => {
                          setstate(data.stateName);
                          setisDropOpen(!isDropOpen);
                        }}
                      >
                        {data.stateName}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                fetchRecruitersList();
              }}
              className="w-full focus:outline-none text-center text-white bg-[#dc832d] hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 light:focus:ring-yellow-900 whitespace-nowrap text-ellipsis"
            >
              Search
            </button>
          </div>
        </form>
      </Hero>
      <div className="pb-10 md:px-20 px-5 text-black">
        <div className="my-5 md:w-[80%] mx-auto">
          <span className="text-sm font-normal text-gray-500 light:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing{" "}
            <span className="font-semibold text-gray-900 light:text-white">
              {recruiterList.length}
            </span>{" "}
            results
          </span>
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
