import { useContext, useEffect, useRef, useState } from "react";
import KOutlinedButton from "../components/kOutlinedButton";
import JobCard from "../components/JobCard";
import Hero from "../components/Hero";
import trendingSearches from "../assets/trending-searches.svg";
import { dbObject } from "../Helper/Constants";
import filterIcon from "../assets/filter.svg";
import { Context } from "../Helper/ContextProvider";
import { KDropDown } from "../components/components";
import Scaffold from "../components/Scaffold";
import noData from "../assets/no-data.svg";

function HomePage() {
  const [loading, setLoading] = useState(false);
  const { isScroll, setisScroll, _id } = useContext(Context);
  const [rolesList, setRolesList] = useState([]);
  const [vacancyList, setvacancyList] = useState([]);
  const [statesList, setstatesList] = useState([]);
  const [selectedState, setselectedState] = useState("Pan India");
  const [isStateDropOpen, setisStateDropOpen] = useState(false);
  const [selectedRole, setselectedRole] = useState("1");
  const [selectedDistance, setselectedDistance] = useState("");
  const [pageNo, setpageNo] = useState(0);

  const openingsRef = useRef(null);

  async function fetchRoles() {
    try {
      // setLoading(true);

      const response = await dbObject.get("/role/fetch-roles.php");
      if (!response.data.error) {
        setRolesList(response.data.response);
        // setselectedRole(response.data.response.id);
      }
      // setLoading(false);
    } catch (error) {
      // setLoading(false);
    }
  }

  async function fetchVacancies() {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("pageNo", pageNo);
      formData.append("searchKey", _id("searchKey").value);
      formData.append("city", _id("city").value);
      formData.append("state", selectedState);
      formData.append("distanceRange", selectedDistance);
      formData.append("roleId", selectedRole);
      const response = await dbObject.post(
        "/vacancy/fetch-vacancies.php",
        formData
      );
      if (!response.data.error) {
        setvacancyList(response.data.response);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  async function fetchStates() {
    try {
      const response = await dbObject.get("/states/fetch-states.php");
      if (!response.data.error) {
        setstatesList(response.data.response);
      }
    } catch (error) {}
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchRoles();
    fetchStates();
  }, []);

  useEffect(() => {
    fetchVacancies();
  }, [selectedRole, pageNo]);

  useEffect(() => {
    if (isScroll) {
      openingsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      setisScroll(false);
    }
  }, [isScroll]);

  return (
    <Scaffold isLoading={loading}>
      <Hero
        title="Healthcare jobs & opportunities"
        subtitle="curated job openings for Physicians, Nurses, Doctors ..."
        buttonLabel="Search company"
      >
        <div className="md:flex md:gap-4 items-center">
          <div className="w-full">
            <input
              type="text"
              id="searchKey"
              className="bg-white border border-gray-200 text-gray-900 text-sm rounded-full block w-full p-2.5 light:bg-gray-700 light:placeholder-gray-400 light:text-white"
              placeholder="Search job titles, keywords, skills etc"
            />
          </div>

          <button
            type="button"
            onClick={() => {
              fetchVacancies();
              setisScroll(true);
            }}
            className="md:w-auto w-full focus:outline-none text-center text-white bg-[#dc832d] hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 light:focus:ring-yellow-900 whitespace-nowrap text-ellipsis"
          >
            Search
          </button>
        </div>
      </Hero>

      <div className="px-2">
        <h1 className="font-semibold text-gray-700 text-center mt-10 text-2xl">
          Trending Job searches
        </h1>
        <p className="font-medium text-gray-400 text-center mt-2 text-sm">
          Most frequent searches by healthcare job seekers like you
        </p>
      </div>

      <div className="mt-10 md:flex justify-center mx-auto items-center gap-10 md:w-[70%]">
        <div className="p-4">
          <img className="h-[300px] mx-auto" src={trendingSearches} alt="" />
        </div>
        <div className="p-4 rounded-xl">
          <h2 className="mt-5 mb-2 text-black">Filter speciality</h2>
          <div className="flex flex-wrap">
            {rolesList.map((data, index) => (
              <div key={index}>
                <KOutlinedButton
                  onClick={() => {
                    setselectedRole(data.id);
                  }}
                  isActive={selectedRole == data.id}
                  label={data.title}
                />
              </div>
            ))}
          </div>
          <h2 className="mt-5 mb-2 text-black">Filter distance</h2>
          <div className="flex flex-wrap">
            <KOutlinedButton
              id={0}
              label="0 - 10 kms"
              isActive={selectedDistance === "0-10"}
              onClick={() => {
                setselectedDistance("0-10");
              }}
            />{" "}
            <KOutlinedButton
              id={0}
              label="11 - 20 kms"
              isActive={selectedDistance === "11-20"}
              onClick={() => {
                setselectedDistance("11-20");
              }}
            />{" "}
            <KOutlinedButton
              id={0}
              label="21 - 30 kms"
              isActive={selectedDistance === "21-30"}
              onClick={() => {
                setselectedDistance("21-30");
              }}
            />
          </div>
          <h2 className="mt-5 mb-2 text-black">Select city or state</h2>
          <div className="flex items-center gap-2">
            <input
              type="text"
              id="city"
              className="bg-white border border-gray-200 text-gray-900 text-sm rounded-full w-full p-2.5 light:bg-gray-700 light:placeholder-gray-400 light:text-white"
              placeholder="Search city..."
            />
            <KDropDown
              value={selectedState}
              id="state"
              isDropOpen={isStateDropOpen}
              margin=""
              onClick={() => {
                setisStateDropOpen(!isStateDropOpen);
              }}
              rounded="full"
            >
              {statesList.map((data, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setselectedState(data.stateName);
                    setisStateDropOpen(!isStateDropOpen);
                  }}
                  className="w-full text-start block px-4 py-2 hover:bg-gray-100 light:hover:bg-gray-600 light:hover:text-white"
                >
                  {data.stateName + ", " + data.abbr}
                </button>
              ))}
            </KDropDown>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => {
                fetchVacancies();
                setisScroll(true);
              }}
              type="button"
              className="mt-5 focus:outline-none text-center text-white bg-[#dc832d] hover:bg-yellow-500 focus:ring-2 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 mb-2 md:ml-4 light:focus:ring-yellow-900 overflow-hidden whitespace-nowrap text-ellipsis flex items-center gap-2"
            >
              <span>
                <img src={filterIcon} className="invert h-5" alt="" />
              </span>
              Filter
            </button>
          </div>
        </div>
      </div>

      <h2
        ref={openingsRef}
        className="my-10 font-medium text-gray-700 text-center text-xl"
      >
        Recent Openings
      </h2>

      {vacancyList.length !== 0 ? (
        vacancyList.map((data, index) => (
          <div key={index}>
            <JobCard data={data} />
          </div>
        ))
      ) : (
        <div className="flex flex-col gap-10">
          <img src={noData} alt="no-data" className="mx-auto h-48 w-4h-48" />
          <h1 className="text-2xl text-gray-400 font-bold mx-auto text-center">
            Sorry! No data found
          </h1>
        </div>
      )}

      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-around py-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 light:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing{" "}
          <span className="font-semibold text-gray-900 light:text-white">
            {vacancyList.length}
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

export default HomePage;
