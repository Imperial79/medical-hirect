import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import HospitalCard from "../components/HospitalCard";
import { dbObject } from "../Helper/Constants";
import Scaffold from "../components/Scaffold";
import { KDropDown } from "../components/components";

function SearchRecruiters() {
  const [loading, setloading] = useState(false);
  const [pageNo, setpageNo] = useState(0);
  const [searchKey, setsearchKey] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("Pan India");

  const [stateList, setstateList] = useState([]);
  const [recruiterList, setrecruiterList] = useState([]);

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
      }
      setloading(false);
    } catch (error) {
      setloading(false);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchState();
  }, []);

  useEffect(() => {
    fetchRecruitersList();
  }, [pageNo, state]);

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
              className="kTextField w-full md:col-span-2 mb-2 md:mb-0"
              placeholder="Search job titles, keywords, skills etc"
              onChange={(e) => {
                setsearchKey(e.target.value);
              }}
            />
            <input
              type="text"
              id="city"
              className="kTextField w-full md:col-span-2 mb-2 md:mb-0"
              placeholder="Search using city..."
              onChange={(e) => {
                setcity(e.target.value);
              }}
            />
            <div className="w-full mb-2 md:mb-0">
              <KDropDown
                id="state"
                name="state"
                label=""
                margin="mb-0"
                onChange={() => {
                  setstate(data.stateName);
                }}
              >
                {stateList.map((data, index) => (
                  <option key={index} value={data.stateName}>
                    {data.stateName}
                  </option>
                ))}
              </KDropDown>
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
      <div className="mt-10 pb-10 md:px-20 text-black grid md:grid-cols-3 grid-cols-1 gap-3">
        {recruiterList.map((data, index) => (
          <div key={index}>
            <HospitalCard data={data} />
          </div>
        ))}
      </div>

      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-around p-5"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 light:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing{" "}
          <span className="font-semibold text-gray-900 light:text-white">
            {recruiterList.length}
          </span>{" "}
          of Page
          <span className="font-semibold text-gray-900 light:text-white">
            {" "}
            {pageNo + 1}
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
