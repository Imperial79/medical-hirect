import React, { useEffect, useState } from "react";
import KOutlinedButton from "../components/kOutlinedButton";
import JobCard from "../components/JobCard";
import Hero from "../components/Hero";
import trendingSearches from "../assets/trending-searches.svg";
import { dbObject } from "../Helper/Constants";
import Dropdown from "../components/Dropdown";
import filterIcon from "../assets/filter.svg";

function HomePage() {
  const [loading, setLoading] = useState(false);
  const [rolesList, setRolesList] = useState([]);
  const [vacancyList, setvacancyList] = useState([]);
  const [statesList, setstatesList] = useState([]);

  async function fetchRoles() {
    try {
      // setLoading(true);

      const response = await dbObject.get("/role/fetch-roles.php");
      // console.log(response);
      if (!response.data.error) {
        setRolesList(response.data.response);
      }
      // setLoading(false);
    } catch (error) {
      // setLoading(false);
    }
  }

  async function fetchVacancies() {
    try {
      // setLoading(true);
      const formData = new FormData();
      formData.append("pageNo", "0");
      formData.append("searchKey", "");
      formData.append("city", "");
      formData.append("state", "");
      formData.append("distanceRange", "");
      const response = await dbObject.post(
        "/vacancy/fetch-common-vacancies.php",
        formData
      );
      console.log(response);
      if (!response.data.error) {
        setvacancyList(response.data.response);
      }
      // setLoading(false);
    } catch (error) {
      // setLoading(false);
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
    fetchRoles();
    fetchStates();
    fetchVacancies();
  }, []);

  return (
    <div>
      <Hero
        title="Healthcare jobs & opportunities"
        subtitle="curated job openings for Physicians, Nurses, Doctors ..."
        buttonLabel="Search company"
      />

      <div className="px-2">
        <h1 className="font-semibold text-gray-700 text-center mt-10 text-2xl">
          Trending Job searches
        </h1>
        <p className="font-medium text-gray-400 text-center mt-2 text-sm">
          Most frequent searches by healthcare job seekers like you
        </p>
      </div>

      <div className="mt-20 md:flex justify-center mx-auto items-center gap-10 md:w-[70%]">
        <div className="p-4">
          <img className="h-[300px] mx-auto" src={trendingSearches} alt="" />
        </div>
        <div className="p-4 rounded-xl">
          <h2 className="mt-5 mb-2 text-black">Filter speciality</h2>
          <div className="flex flex-wrap">
            {rolesList.map((data, index) => (
              <div key={data.id}>
                <KOutlinedButton label={data.title} />
              </div>
            ))}
          </div>
          <h2 className="mt-5 mb-2 text-black">Filter distance</h2>
          <div className="flex flex-wrap">
            <KOutlinedButton label="0 - 10 kms" />
            <KOutlinedButton label="11 - 20 kms" />
            <KOutlinedButton label="21 - 30 kms" />
          </div>
          <h2 className="mt-5 mb-2 text-black">Select city or state</h2>
          <div className="flex items-center">
            <input
              type="text"
              className="bg-white border border-gray-200 text-gray-900 text-sm rounded-full block w-full p-2.5 light:bg-gray-700 light:placeholder-gray-400 light:text-white"
              placeholder="Search city..."
            />
            <Dropdown dataList={statesList} />
          </div>
          <div className="flex justify-end">
            <button
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

      <h2 className="my-10 font-medium text-gray-700 text-center text-xl">
        Recent Openings
      </h2>

      {vacancyList.map((data, index) => (
        <div key={data.id}>
          <JobCard data={data} />
        </div>
      ))}
    </div>
  );
}

export default HomePage;
